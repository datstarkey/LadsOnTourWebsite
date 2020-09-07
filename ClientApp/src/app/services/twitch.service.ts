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
    "dashboard/user?&twitch=true";
  encodedUrl: string = encodeURIComponent(this.baseUrl);

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  getStreamData(): Observable<IStreams> {
    return this.http.get<IStreams>(`${this.loginService.baseUrl}api/v1/twitch`);
  }

  twitchLogin() {
    const encodedUrl = encodeURIComponent(
      window.location.href + "?twitch=true"
    );
    var url = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=55um43uxqazd1mvt4qnwchsp4lbx4j&redirect_uri=${encodedUrl}`;
    window.location.href = url;
  }

  getTwitchCode(code) {
    code = code.split("#");
    var split = code[1].split("=");
    return [code[0], split[1]];
  }
}
