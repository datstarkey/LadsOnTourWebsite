import { NavBarComponent } from "./../../main/nav-bar/nav-bar.component";
import { CookieService } from "ngx-cookie-service";
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "./../../services/login/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

interface navItem {
  title: string;
  url: string;
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

  mobileNav: boolean;

  userNav: navItem = { title: "User", url: "user", icon: "person-outline" };
  bisListNav: navItem = {
    title: "Bis List",
    url: "bis-list",
    icon: "list-outline",
  };
  applyNav: navItem = {
    title: "Apply",
    url: "apply",
    icon: "clipboard-outline",
  };
  rosterNav: navItem = {
    title: "roster",
    url: "roster",
    icon: "people-outline",
  };
  streamsNav: navItem = {
    title: "streams",
    url: "streams",
    icon: "video-outline",
  };
  raidNav: navItem = {
    title: "Raid Times",
    url: "raid",
    icon: "clock-outline",
  };

  downloadsNav: navItem = {
    title: "downloads",
    url: "downloads",
    icon: "cloud-download-outline",
  };
  applicationsNav: navItem = {
    title: "applications",
    url: "applications",
    icon: "clipboard-outline",
  };
  calendarNav: navItem = {
    title: "calendar",
    url: "calendar",
    icon: "calendar-outline",
  };
  logsNav: navItem = { title: "logs", url: "logs", icon: "activity-outline" };

  pages: navItem[] = [
    this.userNav,
    this.raidNav,
    this.applyNav,
    this.rosterNav,
    this.streamsNav,
  ];

  subscriptions: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  enableMobileNav() {
    this.mobileNav = true;
  }

  disableMobileNav() {
    this.mobileNav = false;
  }

  setPage() {
    var navigation = this.router.url.split("/");
    navigation = navigation[2].split("?");
    this.page = navigation[0];
    this.cookieService.set("lastPage", this.router.url, null, "/");
  }

  navigate(page) {
    this.router.navigate(["dashboard", page]);
    this.mobileNav = false;
  }

  navigateHome() {
    this.router.navigate(["main", "home"]);
    this.mobileNav = false;
  }

  ngOnInit() {
    this.setPage();
    this.subscriptions.add(
      this.loginService.raider.subscribe((value) => {
        this.raider = value;

        if (this.raider) {
          this.pages = [
            this.userNav,
            //    this.raidNav,
            this.bisListNav,
            this.downloadsNav,
            this.applicationsNav,
            this.logsNav,
            this.rosterNav,
            this.streamsNav,
            this.calendarNav,
          ];
        }
      })
    );

    this.subscriptions.add(
      this.loginService.loggedIn.subscribe((value) => {
        this.loggedIn = value;
      })
    );

    this.subscriptions.add(
      this.loginService.loading.subscribe((value) => {
        this.loading = value;
      })
    );

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setPage();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
