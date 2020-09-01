import { IJwtToken } from "./../../interfaces/jwtToken";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { DiscordUser } from "../../interfaces/discordUser";
import { NbToastrService, NbComponentStatus } from "@nebular/theme";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loading = new BehaviorSubject<boolean>(false);
  admin = new BehaviorSubject<boolean>(false);
  raider = new BehaviorSubject<boolean>(false);
  username = new Subject<string>();

  baseUrl: string = document.getElementsByTagName("base")[0].href.toString();
  actualUrl: string = document.getElementsByTagName("base")[0].href.toString();
  encodedUrl: string = encodeURIComponent(this.baseUrl);
  jwtToken: string;

  private clientID: string = "699630536125186160";

  public User: DiscordUser;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private router: Router
  ) {
    this.baseUrl = this.baseUrl.replace("4200", "5400");
  }

  showToast(response, title, status: NbComponentStatus, position) {
    this.toastrService.show(response.toString(), title, { status, position });
  }

  discordLogin() {
    var url = `https://discordapp.com/api/oauth2/authorize?client_id=${this.clientID}&redirect_uri=${this.encodedUrl}&response_type=code&scope=identify%20guilds&prompt=none`;
    console.log(url);
    window.location.href = url;
  }

  getParamValueQueryString(paramName) {
    var url = window.location.href;
    let paramValue;
    const httpParams = new HttpParams({ fromString: url.split("?")[1] });
    paramValue = httpParams.get(paramName);
    return paramValue;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  login(code, refresh): Observable<any> {
    return this.http.get<any>(
      this.baseUrl +
        `api/v1/login?code=${code}&url=${this.encodedUrl}&refresh=${refresh}`
    );
  }

  goodLogin(data) {
    console.log(data);

    this.User = data.user;
    this.cookieService.set("refreshToken", data.refreshToken);
    this.jwtToken = data.token;
    this.decodeToken();

    this.showToast("Login Success", "Logged In", "success", "bottom-right");
    this.loading.next(false);
    this.loggedIn.next(true);

    var username = `${this.User.username}#${this.User.discriminator}`;
    this.username.next(username.toString());

    const url = this.router.url;
  }

  decodeToken() {
    var decoded = jwtDecode(this.jwtToken) as IJwtToken;

    if (decoded && decoded.role) {
      if (decoded.role.indexOf("Admin") > -1) {
        this.admin.next(true);
      }

      if (decoded.role.indexOf("Raider") > -1) {
        this.raider.next(true);
      }
    }
  }

  badLogin(error) {
    console.log(error);

    this.loading.next(false);
    this.loggedIn.next(false);
    this.cookieService.delete("refreshToken");

    this.showToast(
      "Error Loggin in",
      "Please Login through discord",
      "danger",
      "bottom-right"
    );
  }

  refreshLogin() {
    var refreshToken = this.cookieService.get("refreshToken");
    this.login(refreshToken, true).subscribe(
      (data) => {
        this.cookieService.set("refreshToken", data.refreshToken);
        console.log(data);
        this.jwtToken = data.token;
        this.decodeToken();
      },
      (error) => {
        this.badLogin(error);
      }
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.loading.next(false);
    this.cookieService.delete("refreshToken");
    this.showToast("Logged Out", "Logout", "danger", "bottom-right");
  }

  autoLogin() {
    this.loading.next(true);
    var accessCode = this.getParamValueQueryString("code");
    var refreshAvailable: boolean = this.cookieService.check("refreshToken");

    if (refreshAvailable) {
      var refreshToken = this.cookieService.get("refreshToken");
      this.login(refreshToken, true).subscribe(
        (data) => {
          this.goodLogin(data);
        },
        (error) => {
          this.badLogin(error);
        }
      );
    } else if (accessCode) {
      this.login(accessCode, false).subscribe(
        (data) => {
          this.goodLogin(data);
        },
        (error) => {
          this.badLogin(error);
        }
      );
    } else {
      this.loading.next(false);
    }
  }
}
