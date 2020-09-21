import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../../services/user/user.service";
import { IUser } from "../../../interfaces/user";
import { IRaidInfo } from "app/interfaces/raidInfo";

@Component({
  selector: "app-raid-info",
  templateUrl: "./raid-info.component.html",
  styleUrls: ["./raid-info.component.scss"],
})
export class RaidInfoComponent implements OnInit {
  @Input() user: IUser;

  wednesday: boolean;
  thursday: boolean;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  raidTimes: boolean;

  raidInfo: IRaidInfo = {
    wednesday: false,
    thursday: false,
    sunday: false,
    monday: false,
    tuesday: false,
    raidTimes: false,
  };

  constructor(private userService: UserService) {}

  updateUser() {
    this.user.days = JSON.stringify(this.raidInfo);
    this.userService.updateUser(this.user);
  }

  ngOnChanges() {
    if (this.user.days != null && isNaN(+this.user.days)) {
      this.raidInfo = JSON.parse(this.user.days);
    }
  }

  ngOnInit() {}
}
