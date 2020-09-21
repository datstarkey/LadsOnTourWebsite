import { WowService } from "../../../../services/wow/wow.service";
import { LoginService } from "../../../../services/login/login.service";
import { UserService } from "../../../../services/user/user.service";
import { IUser } from "../../../../interfaces/user";
import { Component, OnInit, Input } from "@angular/core";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  @Input() user: IUser;
  @Input() main: string;
  classes = [];
  constructor(public userService: UserService, private wowService: WowService) {
    this.classes = wowService.classes;
  }

  updateUser() {
    this.userService.updateUser(this.user);
  }

  clearMain() {
    this.userService.clearMain().subscribe((response) => {
      if (response.indexOf("Main Cleared") > -1) {
        this.userService.showToast(
          "Cleared Main",
          "Success",
          "success",
          "bottom-right"
        );
        this.userService.getUser();
      }
    });
  }

  ngOnInit() {}
}
