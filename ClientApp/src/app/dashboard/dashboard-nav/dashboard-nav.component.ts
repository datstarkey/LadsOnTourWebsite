import { NavBarComponent } from "./../../main/nav-bar/nav-bar.component";
import { CookieService } from "ngx-cookie-service";
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "./../../services/login/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

interface navItem {
  title: string;
  icon: string;
}

@Component({
  selector: "app-dashboard-nav",
  templateUrl: "./dashboard-nav.component.html",
  styleUrls: ["./dashboard-nav.component.scss"],
})
export class DashboardNavComponent implements OnInit {
  username: string;
  loggedIn: boolean;
  loading: boolean;
  raider: boolean;
  page: string;

  userNav: navItem = { title: "user", icon: "person-outline" };
  applyNav: navItem = { title: "apply", icon: "clipboard-outline" };
  rosterNav: navItem = { title: "roster", icon: "people-outline" };
  streamsNav: navItem = { title: "streams", icon: "video-outline" };
  downloadsNav: navItem = {
    title: "downloads",
    icon: "cloud-download-outline",
  };
  applicationsNav: navItem = {
    title: "applications",
    icon: "clipboard-outline",
  };
  calendarNav: navItem = { title: "calendar", icon: "calendar-outline" };
  logsNav: navItem = { title: "logs", icon: "activity-outline" };

  pages: navItem[] = [
    this.userNav,
    this.applyNav,
    this.rosterNav,
    this.streamsNav,
  ];

  subscriptions: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {
    loginService.raider.subscribe((value) => {
      this.raider = value;

      if (this.raider) {
        this.pages = [
          this.userNav,
          this.downloadsNav,
          this.applicationsNav,
          this.logsNav,
          this.rosterNav,
          this.streamsNav,
          this.calendarNav,
        ];
      }
    });

    this.subscriptions.push(
      loginService.loggedIn.subscribe((value) => {
        this.loggedIn = value;
      })
    );

    this.subscriptions.push(
      loginService.loading.subscribe((value) => {
        this.loading = value;
      })
    );

    this.subscriptions.push(
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setPage();
        }
      })
    );
  }

  setPage() {
    var navigation = this.router.url.split("/");
    navigation = navigation[2].split("?");
    this.page = navigation[0];
    this.cookieService.set("lastPage", this.router.url, null, "/");
  }

  navigate(page) {
    this.router.navigate(["dashboard", page]);
  }

  navigateHome() {
    this.router.navigate(["main", "home"]);
  }

  ngOnInit() {
    this.setPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
