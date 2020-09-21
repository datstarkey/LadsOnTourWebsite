import { IRosterUser } from "./../../interfaces/rosterUser";
import { UserService } from "../../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-raid-times",
  templateUrl: "./raid-times.component.html",
  styleUrls: ["./raid-times.component.scss"],
})
export class RaidTimesComponent implements OnInit {
  subscription: Subscription = new Subscription();
  users: IRosterUser[] = [];
  notFilledIn: string[] = [];

  cantWednesday: string[] = [];
  cantThursday: string[] = [];
  cantSunday: string[] = [];
  cantMonday: string[] = [];
  cantTuesday: string[] = [];
  cantRaidTimes: string[] = [];

  cantArray: string[][] = [];

  daysOrder: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  constructor(private userService: UserService) {}

  getName(user: IRosterUser): string {
    if (user.nickname == "" || user.nickname == null) {
      return user.discord;
    } else {
      return user.nickname;
    }
  }

  sortUsers() {
    this.cantArray = [];
    this.cantSunday = [];
    this.cantMonday = [];
    this.cantTuesday = [];
    this.cantWednesday = [];
    this.cantThursday = [];
    this.cantRaidTimes = [];

    this.users.forEach((user) => {
      //If they haven't filled in the form.
      if (user.days == null || !isNaN(+user.days)) {
        this.notFilledIn.push(this.getName(user));
      } else {
        user.days = JSON.parse(user.days.toString());
        //monday
        if (!user.days.monday) {
          this.cantMonday.push(this.getName(user));
        }

        //tuesday
        if (!user.days.tuesday) {
          this.cantTuesday.push(this.getName(user));
        }

        //wednesday
        if (!user.days.wednesday) {
          this.cantWednesday.push(this.getName(user));
        }

        //thursday
        if (!user.days.thursday) {
          this.cantThursday.push(this.getName(user));
        }

        //sunday
        if (!user.days.sunday) {
          this.cantSunday.push(this.getName(user));
        }

        if (!user.days.raidTimes) {
          this.cantRaidTimes.push(this.getName(user));
        }
      }
    });
    this.cantArray.push(this.cantSunday);
    this.cantArray.push(this.cantMonday);
    this.cantArray.push(this.cantTuesday);
    this.cantArray.push(this.cantWednesday);
    this.cantArray.push(this.cantThursday);
  }

  getUsers() {
    this.userService.getRosterData().subscribe((result) => {
      this.users = result;
      this.sortUsers();
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.loggedIn.subscribe((result) => {
        if (result) {
          this.getUsers();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
