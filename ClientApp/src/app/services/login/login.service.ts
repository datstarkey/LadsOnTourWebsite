import { IJwtToken } from "./../../interfaces/jwtToken";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
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
  username = new BehaviorSubject<string>("");
  battleNetSynced = new BehaviorSubject<boolean>(false);

  baseUrl: string = document.getElementsByTagName("base")[0].href.toString();
  actualUrl: string = document.getElementsByTagName("base")[0].href.toString();
  encodedUrl: string = encodeURIComponent(this.baseUrl);
  jwtToken: string;

  battleNet: boolean;
  battleNetCode: string;

  twitch: boolean;
  twitchCode: string;

  private clientID: string = "699630536125186160";

  public User: DiscordUser;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

  showToast(response, title, status: NbComponentStatus, position) {
    this.toastrService.show(response.toString(), title, { status, position });
  }

  discordLogin() {
    const url = `https://discordapp.com/api/oauth2/authorize?client_id=${this.clientID}&redirect_uri=${this.encodedUrl}&response_type=code&scope=identify%20guilds&prompt=none`;
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
    this.User = data.user;
    console.log(data.refreshToken);
    this.cookieService.set("refreshToken", data.refreshToken, null, "/");
    this.jwtToken = data.token;
    this.decodeToken();

    this.showToast("Login Success", "Logged In", "success", "bottom-right");
    this.loading.next(false);
    this.loggedIn.next(true);

    var username = `${this.User.username}#${this.User.discriminator}`;
    this.username.next(username.toString());

    if (this.battleNet) {
      this.battleNetAuth();
    }

    if (this.twitch) {
      this.twitchAuth();
    }
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
    this.cookieService.delete("refreshToken", "/");
    this.loading.next(false);
    this.loggedIn.next(false);

    this.showToast(
      "Error Logging in",
      "Please Login through discord",
      "danger",
      "bottom-right"
    );
  }

  refreshLogin() {
    var refreshToken = this.cookieService.get("refreshToken");
    this.login(refreshToken, true).subscribe(
      (data) => {
        this.cookieService.set("refreshToken", data.refreshToken, null, "/");
        this.jwtToken = data.token;
        this.decodeToken();
      },
      (error) => {
        this.badLogin(error);
      }
    );
  }

  battleNetAuth() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
    });

    console.log("Battle Net Authing");
    const encodedUrl = encodeURIComponent(
      window.location.href + "?battlenet=true"
    );

    const url =
      document.getElementsByTagName("base")[0].href.toString() +
      `api/v1/users/characters?code=${this.battleNetCode}&url=${encodedUrl}`;

    this.http
      .post(url, {}, { headers, responseType: "text" })
      .subscribe((data) => {
        this.battleNetSynced.next(true);
        this.showToast(
          "Success",
          "Linked to battle net succesfully!",
          "info",
          "bottom-right"
        );
      });
  }

  battleNetLogin() {
    const encodedUrl = encodeURIComponent(
      window.location.href + "?battlenet=true"
    );
    var url = `https://eu.battle.net/oauth/authorize?client_id=24cdff236ccf4dfda35223b8643be7ff&scope=openid%20wow.profile&redirect_uri=${encodedUrl}&response_type=code`;
    window.location.href = url;
  }

  twitchAuth() {
    const encodedUrl = encodeURIComponent(
      window.location.href + "?twitch=true"
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
    });

    this.http
      .post(
        this.baseUrl +
          `api/v1/twitch?code=${this.twitchCode}&url=${encodedUrl}`,
        {},
        { headers, responseType: "text" }
      )
      .subscribe(
        (data) => {
          this.battleNetSynced.next(true);
          this.showToast(
            "Linked to twitch succesfully!",
            "Success",
            "info",
            "bottom-right"
          );
        },
        (error) => {
          this.showToast(`${error.error}`, "Error", "danger", "bottom-right");
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
    const accessCode = this.getParamValueQueryString("code");
    const battleNet = this.getParamValueQueryString("battlenet");
    const twitch = this.getParamValueQueryString("twitch");
    const lastPageAvaiable = this.cookieService.check("lastPage");
    const refreshAvailable: boolean = this.cookieService.check("refreshToken");
    let page = ["main", "home"];

    if (lastPageAvaiable) {
      page = this.cookieService.get("lastPage").split("/");
      page.shift();
    }

    if (battleNet) {
      this.battleNet = true;
      this.battleNetCode = accessCode;
    }

    if (twitch) {
      this.twitch = true;
      this.twitchCode = accessCode;
    }

    this.router.navigate(page);

    if (accessCode && !twitch && !battleNet) {
      this.login(accessCode, false).subscribe(
        (data) => {
          this.goodLogin(data);
        },
        (error) => {
          this.badLogin(error);
        }
      );
    } else if (refreshAvailable) {
      const refreshToken = this.cookieService.get("refreshToken");
      this.login(refreshToken, true).subscribe(
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
