import { logging } from "protractor";
import { ICharacter } from "./../interfaces/character";
import { IUser } from "./../interfaces/user";
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
  user: IUser;
  characters: ICharacter[];
  main: number;
  classText: string;
  loggedIn: boolean;

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  setText() {
    if (this.main !== null && this.characters.length > 0) {
      const character = this.characters.find(
        (c) => c.character_id == this.main
      );
      this.classText = `${character.level} ${character._class} - ${character.guild}`;
    }
  }

  ngOnInit() {
    this.subscriptions.add(
      this.loginService.loggedIn.subscribe((result) => {
        this.loggedIn = result;
      })
    );

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
        if (result.main) {
          this.main = result.main;
          this.setText();
        }
      })
    );

    this.subscriptions.add(
      this.userService.characters.subscribe((result) => {
        this.characters = result;
        this.setText();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
