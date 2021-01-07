import { WowService } from "./../../../services/wow/wow.service";
import { ICharacter } from "./../../../interfaces/character";
import { IUser } from "./../../../interfaces/user";
import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./../../../services/user/user.service";

@Component({
  selector: "[app-admin-users-user]",
  templateUrl: "./admin-users-user.component.html",
  styleUrls: ["./admin-users-user.component.scss"],
})
export class AdminUsersUserComponent implements OnInit {
  subscription: Subscription = new Subscription();
  @Input() user: IUser;
  characters: ICharacter[];
  selectedCharacter: ICharacter;
  isMain: boolean = false;

  constructor(
    private userService: UserService,
    private wowService: WowService
  ) {}

  characterSelected() {
    console.log(this.selectedCharacter);
    if (
      this.selectedCharacter != null &&
      this.selectedCharacter.character_id == this.user.main
    ) {
      this.isMain = true;
    } else {
      this.isMain = false;
    }
  }

  updateCharacter() {
    this.userService.updateUserCharacter(
      this.user.discordID,
      this.selectedCharacter,
      this.isMain
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.userService
        .getCharacterByUser(this.user.discordID)
        .subscribe((result) => {
          this.characters = result;
          if (this.user.main != 0) {
            var main = result.find((c) => c.character_id == this.user.main);
            if (main != null) {
              this.selectedCharacter = main;
              this.isMain = true;
            }
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
