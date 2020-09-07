import { UserService } from "./../services/user/user.service";
import { LoginService } from "./../services/login/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  username: string;
  nickname: string;
  subscriptions: Subscription = new Subscription();
  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.loginService.username.subscribe((result) => {
        this.username = result;
      })
    );

    this.subscriptions.add(
      this.userService.user.subscribe((result) => {
        if (result.nickname) {
          this.nickname = result.nickname;
        } else {
          this.nickname = result.discord;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
