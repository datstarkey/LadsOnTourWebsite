import { LoginService } from "./../../../services/login/login.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  loading: boolean = true;

  constructor(private loginService: LoginService) {
    this.loginService.loading.subscribe((response) => {
      this.loading = response;
    });
  }

  login() {
    this.loginService.discordLogin();
  }

  ngOnInit() {}
}
