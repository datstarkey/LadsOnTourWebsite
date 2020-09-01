import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "../services/login/login.service";

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    loginService.loggedIn.subscribe((value) => {
      this.loggedIn = value;
      if (value) {
        this.navigate(this.page);
      }
    });

    loginService.loading.subscribe((value) => {
      this.loading = value;
    });

    loginService.raider.subscribe((value) => {
      this.raider = value;
      if (this.raider) {
        this.pages = [
          "home",
          "applications",
          "roster",
          "streams",
          //"calendar",
          //"addons",
        ];
      }
    });

    //   <h1
    //   *ngIf="page != 'home'"
    //   class="logo animate__animated animate__fadeInLeft"
    // >
    //   LADS ON TOUR
    // </h1>

    // <div *ngIf="page == 'home'"></div>

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setPage();
      }
    });
  }

  enableMobileNav() {
    this.mobileNav = true;
  }

  setPage() {
    var navigation = this.router.url.split("/");
    navigation = navigation[1].split("?");
    this.page = navigation[0];
  }

  navigate(page) {
    this.router.navigate([page]);
    this.mobileNav = false;
  }

  ngOnInit() {
    this.loginService.autoLogin();
    this.loginService.username.subscribe((username) => {
      this.username = username;
    });
    this.setPage();
  }

  ngOnChanges() {}
}
