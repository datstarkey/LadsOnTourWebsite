import { ICharacter } from "../../../../interfaces/character";
import { WowService } from "../../../../services/wow/wow.service";
import { LoginService } from "../../../../services/login/login.service";
import { UserService } from "../../../../services/user/user.service";
import { IUser } from "../../../../interfaces/user";
import { Component, OnInit, Input } from "@angular/core";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent implements OnInit {
  @Input() user: IUser;
  @Input() characters: ICharacter[];
  selectedCharater: ICharacter = {} as any;

  mainChecked: boolean;
  classes = [];
  constructor(
    private userService: UserService,
    private wowService: WowService,
    private toastService: NbToastrService
  ) {
    this.classes = wowService.classes;
  }

  showToast(position) {
    this.toastService.success("Updated Main", "Success", { position });
  }

  characterSelected() {
    if (this.selectedCharater.character_id == this.user.main) {
      this.mainChecked = true;
    } else {
      this.mainChecked = false;
    }
  }

  toggle(checked: boolean) {
    if (checked) {
      this.userService.updateCharacter(this.selectedCharater, true, false);
      this.showToast("bottom-right");
    }
  }

  updateCharacter() {
    this.userService.updateCharacter(this.selectedCharater, this.mainChecked);
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.selectedCharater.name == null && this.characters.length > 0) {
      if (this.user.main != 0) {
        var main = this.characters.find(
          (c) => c.character_id == this.user.main
        );
        if (main != null) {
          this.selectedCharater = main;
        }
      } else {
        this.selectedCharater = this.characters[0];
      }
      this.characterSelected();
    }
  }
}
