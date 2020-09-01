import { IStreams } from "./../interfaces/streams";
import { Observable } from "rxjs";
import { UserService } from "./user/user.service";
import { Router } from "@angular/router";
import { LoginService } from "./login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TwitchService {
  baseUrl: string =
    document.getElementsByTagName("base")[0].href.toString() +
    "user?&twitch=true";
  encodedUrl: string = encodeURIComponent(this.baseUrl);

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.loginService.loggedIn.subscribe((response) => {
      if (response == true) {
        var twitchParam = this.loginService.getParamValueQueryString("twitch");
        if (twitchParam == "true") {
          this.twitchAuth();
        }
      }
    });
  }

  getStreamData(): Observable<IStreams> {
    return this.http.get<IStreams>(`${this.loginService.baseUrl}api/v1/twitch`);
  }

  twitchLogin() {
    var url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=55um43uxqazd1mvt4qnwchsp4lbx4j&redirect_uri=${this.encodedUrl}`;
    window.location.href = url;
  }

  twitchAuth() {
    var code = this.loginService.getParamValueQueryString("code");
    if (!code) {
      this.twitchLogin();
    } else {
      this.router.navigate(["user"]);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.loginService.jwtToken}`,
      });

      this.http
        .post(
          this.loginService.baseUrl +
            `api/v1/twitch?code=${code}&url=${this.encodedUrl}`,
          {},
          { headers, responseType: "text" }
        )
        .subscribe(
          (data) => {
            this.loginService.showToast(
              "Linked to twitch succesfully!",
              "Success",
              "info",
              "bottom-right"
            );
            this.userService.getUser();
          },
          (error) => {
            this.loginService.showToast(
              `${error.error}`,
              "Error",
              "danger",
              "bottom-right"
            );
          }
        );
    }
  }

  getTwitchCode(code) {
    code = code.split("#");
    var split = code[1].split("=");
    return [code[0], split[1]];
  }
}
