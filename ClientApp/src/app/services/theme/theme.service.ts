import { NbThemeService } from "@nebular/theme";
import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  darkMode: boolean;
  theme: string;

  constructor(
    private cookieService: CookieService,
    private themeService: NbThemeService
  ) {
    this.cookieService.check("theme")
      ? (this.theme = this.cookieService.get("theme"))
      : (this.theme = "default");
    this.theme == "dark" ? (this.darkMode = true) : (this.darkMode = false);

    //    this.changeTheme();
  }

  setCookie() {
    this.darkMode ? (this.theme = "default") : (this.theme = "dark");
    // this.changeTheme();
  }

  changeTheme() {
    this.cookieService.set("theme", this.theme);
    this.themeService.changeTheme(this.theme);
  }
}
