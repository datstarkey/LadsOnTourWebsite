import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from "@angular/core";
import { IUser } from "app/interfaces/user";
import { Subscription } from "rxjs";

@Component({
  selector: "app-bis-list",
  templateUrl: "./bis-list.component.html",
  styleUrls: ["./bis-list.component.scss"],
})
export class BisListComponent implements OnInit {
  subscription: Subscription = new Subscription();
  user: IUser;
  items: WoWItem[] = [];

  heads: WoWItem[] = [];
  necks: WoWItem[] = [];
  shoulders: WoWItem[] = [];
  cloaks: WoWItem[] = [];
  chests: WoWItem[] = [];
  wrists: WoWItem[] = [];
  gloves: WoWItem[] = [];
  waists: WoWItem[] = [];
  legs: WoWItem[] = [];
  rings: WoWItem[] = [];
  trinkets: WoWItem[] = [];
  mainHands: WoWItem[] = [];
  offHands: WoWItem[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription.add(
      this.userService.user.subscribe((res) => {
        this.user = res;
        if (this.user.class) {
          this.subscription.add(
            this.userService.getRaidItems(this.user.class).subscribe((res) => {
              this.items = res;
              console.log(res);
              this.items.push({
                id: 0,
                inventoryType: "Other",
                name: "Not From Raid",
                itemClass: "Other",
                itemSubClass: "Other",
              });

              this.heads = res.filter(
                (i) => i.inventoryType == "Head" || i.inventoryType == "Other"
              );
              this.necks = res.filter(
                (i) => i.inventoryType == "Neck" || i.inventoryType == "Other"
              );
              this.shoulders = res.filter(
                (i) =>
                  i.inventoryType == "Shoulder" || i.inventoryType == "Other"
              );
              this.cloaks = res.filter(
                (i) => i.inventoryType == "Back" || i.inventoryType == "Other"
              );
              this.chests = res.filter(
                (i) => i.inventoryType == "Chest" || i.inventoryType == "Other"
              );
              this.wrists = res.filter(
                (i) => i.inventoryType == "Wrist" || i.inventoryType == "Other"
              );
              this.gloves = res.filter(
                (i) => i.inventoryType == "Hands" || i.inventoryType == "Other"
              );
              this.waists = res.filter(
                (i) => i.inventoryType == "Waist" || i.inventoryType == "Other"
              );
              this.legs = res.filter(
                (i) => i.inventoryType == "Legs" || i.inventoryType == "Other"
              );
              this.rings = res.filter(
                (i) => i.inventoryType == "Finger" || i.inventoryType == "Other"
              );
              this.trinkets = res.filter(
                (i) =>
                  i.inventoryType == "Trinket" || i.inventoryType == "Other"
              );
              this.mainHands = res.filter(
                (i) =>
                  i.inventoryType == "Non-equippable" ||
                  i.inventoryType == "Other"
              );
              this.offHands = res.filter(
                (i) =>
                  i.inventoryType == "Non-equippable" ||
                  i.inventoryType == "Other"
              );
            })
          );
        }
      })
    );
  }

  updateCharacter() {
    this.userService.updateUser(this.user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
