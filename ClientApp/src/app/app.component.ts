import { CookieService } from "ngx-cookie-service";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { LoginService } from "./services/login/login.service";
import { ThemeService } from "./services/theme/theme.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  ngOnInit() {
    this.loginService.autoLogin();
  }

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService
  ) {}
}
