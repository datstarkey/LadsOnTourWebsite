import { TwitchService } from "../../services/twitch/twitch.service";
import { ICharacter } from "../../interfaces/character";
import { WowService } from "../../services/wow/wow.service";
import { ThemeService } from "../../services/theme/theme.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { IUser } from "../../interfaces/user";
import { LoginService } from "../../services/login/login.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  loggedIn: boolean;
  user: IUser = {} as any;
  characters: ICharacter[] = {} as any;
  mainName: string = "None";
  roles = ["Tank", "Melee", "Healer", "Ranged"];
  todoList = [];
  classes = [];

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private themeService: ThemeService,
    private wowService: WowService,
    private twitchService: TwitchService
  ) {}

  submitData() {
    this.userService.updateUser(this.user);
  }

  getMain() {
    if (this.characters.length > 0 && this.user.main != 0) {
      return this.characters.find((c) => c.character_id == this.user.main);
    }
  }

  todos() {
    var todos = [];
    if (this.user.class == "TBC") {
      todos.push("Pick a class");
    }

    if (this.user.role == "TBC") {
      todos.push("Pick a role");
    }

    if (this.user.main == 0) {
      todos.push("Select a main");
    } else if (
      this.getMain() != null &&
      this.getMain().guild != "Lads on Tour"
    ) {
      todos.push("Join Lads on Tour Guild");
    }

    todos.push("Wait till Shadowlands");
    todos.push("Get 60");
    todos.push("Set Bis List");
    todos.push("Get Pre Raid Bis");
    this.todoList = todos;
  }

  ngOnInit() {
    this.classes = this.wowService.classes;

    this.subscription.add(
      this.loginService.loggedIn.subscribe((response) => {
        this.loggedIn = response;
        if (this.loggedIn) {
          this.userService.getCharacters();
          this.userService.getUser();
        }
      })
    );

    this.subscription.add(
      this.userService.user.subscribe((response) => {
        this.roles = ["Tank", "Melee", "Healer", "Ranged"];
        this.user = response;
        this.todos();
      })
    );

    this.subscription.add(
      this.userService.characters.subscribe((response) => {
        this.characters = response;
        this.todos();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
