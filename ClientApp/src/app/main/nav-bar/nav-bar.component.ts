import { Observable, Subscription } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "../../services/login/login.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  username: string;
  loggedIn: boolean;
  loading: boolean;
  raider: boolean;
  page: string;
  pages = ["home", "apply", "roster", "streams"];
  mobileNav: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  enableMobileNav() {
    this.mobileNav = true;
  }

  setPage() {
    var navigation = this.router.url.split("/");
    navigation = navigation[2].split("?");
    this.page = navigation[0];
    this.cookieService.set("lastPage", this.router.url, null, "/");
  }

  navigate(page) {
    this.router.navigate(["main", page]);
    this.mobileNav = false;
  }

  navigateDashboard() {
    this.router.navigate(["dashboard", "user"]);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.loggedIn.subscribe((value) => {
        this.loggedIn = value;
        if (this.loggedIn) {
          this.pages.push("dashboard");
        }
      })
    );

    this.subscriptions.push(
      this.loginService.loading.subscribe((value) => {
        this.loading = value;
      })
    );

    this.subscriptions.push(
      this.loginService.raider.subscribe((value) => {
        this.raider = value;
        if (this.raider) {
          this.pages.splice(1, 1);
        }
      })
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setPage();
      }
    });

    this.subscriptions.push(
      this.loginService.username.subscribe((username) => {
        this.username = username;
      })
    );
    this.setPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
