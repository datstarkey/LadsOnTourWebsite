import { IUser } from "./../../interfaces/user";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./../../services/user/user.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
})
export class AdminPageComponent implements OnInit {
  subscription: Subscription = new Subscription();
  users: IUser[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.getAllUsers().subscribe((result) => {
        this.users = result;
        console.log(result);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
