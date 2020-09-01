import { UserService } from "./../user/user.service";
import { Router } from "@angular/router";
import { LoginService } from "./../login/login.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NbComponentStatus, NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class WowService {
  baseUrl: string =
    document.getElementsByTagName("base")[0].href.toString() +
    "user?&battlenet=true";
  encodedUrl: string = encodeURIComponent(this.baseUrl);
  roles = ["Tank", "Melee", "Healer", "Ranged"];

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private toastrService: NbToastrService
  ) {
    this.loginService.loggedIn.subscribe((response) => {
      if (response == true) {
        var battleNetRefresh = this.loginService.getParamValueQueryString(
          "battlenet"
        );

        if (battleNetRefresh == "true") {
          this.battleNetAuth();
        }
      }
    });
  }

  showToast(title, response, status: NbComponentStatus, position) {
    this.toastrService.show(response.toString(), title, { status, position });
  }

  battleNetAuth() {
    var code = this.loginService.getParamValueQueryString("code");
    if (!code) {
      this.battleNetLogin();
    } else {
      this.router.navigate(["user"]);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.loginService.jwtToken}`,
      });

      this.http
        .post(
          this.loginService.baseUrl +
            `api/v1/users/characters?code=${code}&url=${this.encodedUrl}`,
          {},
          { headers, responseType: "text" }
        )
        .subscribe((data) => {
          this.showToast(
            "Success",
            "Linked to battle net succesfully!",
            "info",
            "bottom-right"
          );
          this.userService.getUser();
          this.userService.getCharacters();
        });
    }
  }

  battleNetLogin() {
    var url = `https://eu.battle.net/oauth/authorize?client_id=24cdff236ccf4dfda35223b8643be7ff&scope=openid%20wow.profile&redirect_uri=${this.encodedUrl}&response_type=code`;
    window.location.href = url;
  }

  filterRoles(className) {
    if (className == "TBC") {
      return this.roles;
    }

    var element = [];
    this.classes.forEach((cl) => {
      if (cl.name == className) {
        element = cl.roles;
      }
    });

    return element;
  }

  getClasses() {
    var element = [];
    this.classes.forEach((c) => {
      element.push(c.name);
    });
    return element;
  }

  classes = [
    {
      name: "Death Knight",
      roles: ["Tank", "Melee"],
    },
    {
      name: "Demon Hunter",
      roles: ["Tank", "Melee"],
    },
    {
      name: "Druid",
      roles: ["Tank", "Melee", "Healer", "Ranged"],
    },
    {
      name: "Hunter",
      roles: ["Melee", "Ranged"],
    },
    {
      name: "Mage",
      roles: ["Ranged"],
    },
    {
      name: "Monk",
      roles: ["Tank", "Melee", "Healer"],
    },
    {
      name: "Paladin",
      roles: ["Tank", "Melee", "Healer"],
    },
    {
      name: "Priest",
      roles: ["Healer", "Ranged"],
    },
    {
      name: "Rogue",
      roles: ["Melee"],
    },
    {
      name: "Warlock",
      roles: ["Ranged"],
    },
    {
      name: "Shaman",
      roles: ["Melee", "Healer", "Ranged"],
    },
    {
      name: "Warrior",
      roles: ["Tank", "Melee"],
    },
  ];
}
