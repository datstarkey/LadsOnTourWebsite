import { AppComponent } from "./../../app.component";
import { IRosterUser } from "./../../interfaces/rosterUser";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injectable,
  ChangeDetectorRef,
} from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-roster",
  templateUrl: "./roster.component.html",
  styleUrls: ["./roster.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable()
export class RosterComponent implements OnInit {
  subscription: Subscription = new Subscription();
  totalDps = 0;
  totalMelee = 0;
  totalRanged = 0;
  totalTanks = 0;
  totalHealers = 0;

  constructor(
    private userService: UserService,
    private ref: ChangeDetectorRef
  ) {}

  users: IRosterUser[];
  loading: boolean;

  ngOnInit() {
    this.loading = true;
    this.subscription.add(
      this.userService.getRosterData().subscribe((data) => {
        this.users = data;
        this.getClasses(this.users);

        this.loading = false;
        this.ref.detectChanges();
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getClasses(users) {
    users.map((user) => {
      if (user.nickname == null) {
        user.nickname = user.discord;
      }

      if (user.armory == null) {
        user.armory = "";
      }

      if (!user.role) {
        user.role == "TBC";
      }

      if (!user.class) {
        user.class = "TBC";
      }

      if (user.class == "Demon Hunter") {
        user.class = "DH";
      }

      if (user.class == "Death Knight") {
        user.class = "DK";
      }

      if (user.role == "Healer") {
        if (user.class != "TBC") {
          this.healerClasses.find((u) => u.name == user.class).value++;
        }
        this.totalHealers++;
        user.roleColor = "#00D68F";
      }

      if (user.role == "Melee") {
        if (user.class != "TBC") {
          this.meleeClasses.find((u) => u.name == user.class).value++;
        }
        this.totalMelee++;
        user.roleColor = "#FF3D71";
      }

      if (user.role == "Ranged") {
        if (user.class != "TBC") {
          this.rangedClasses.find((u) => u.name == user.class).value++;
        }
        this.totalRanged++;
        user.roleColor = "#f59898";
      }

      if (user.role == "Tank") {
        if (user.class != "TBC") {
          this.tankClasses.find((u) => u.name == user.class).value++;
        }
        this.totalTanks++;
        user.roleColor = "#0095FF";
      }

      if (user.class == "DH") {
        user.class = "Demon Hunter";
      }

      if (user.class == "DK") {
        user.class = "Death Knight";
      }

      if (user.role == "TBC") {
        user.roleColor = "#644980";
      }

      if (user.class == "TBC") {
        user.classColor = "#ff2e2e";
      }

      if (user.class != "TBC") {
        user.classColor = this.classColors.find(
          (c) => c.name == user.class
        ).value;
      }
    });
  }

  meleeClasses = [
    {
      name: "DK",
      value: 0,
    },
    {
      name: "DH",
      value: 0,
    },
    {
      name: "Druid",
      value: 0,
    },
    {
      name: "Hunter",
      value: 0,
    },
    {
      name: "Monk",
      value: 0,
    },
    {
      name: "Paladin",
      value: 0,
    },
    {
      name: "Rogue",
      value: 0,
    },
    {
      name: "Shaman",
      value: 0,
    },
    {
      name: "Warrior",
      value: 0,
    },
  ];
  rangedClasses = [
    {
      name: "Druid",
      value: 0,
    },
    {
      name: "Hunter",
      value: 0,
    },
    {
      name: "Mage",
      value: 0,
    },
    {
      name: "Priest",
      value: 0,
    },
    {
      name: "Shaman",
      value: 0,
    },
    {
      name: "Warlock",
      value: 0,
    },
  ];
  dpsClasses = [
    {
      name: "DK",
      value: 0,
    },
    {
      name: "DH",
      value: 0,
    },
    {
      name: "Druid",
      value: 0,
    },
    {
      name: "Hunter",
      value: 0,
    },
    {
      name: "Mage",
      value: 0,
    },
    {
      name: "Monk",
      value: 0,
    },
    {
      name: "Paladin",
      value: 0,
    },
    {
      name: "Priest",
      value: 0,
    },
    {
      name: "Rogue",
      value: 0,
    },
    {
      name: "Shaman",
      value: 0,
    },
    {
      name: "Warlock",
      value: 0,
    },
    {
      name: "Warrior",
      value: 0,
    },
  ];
  tankClasses = [
    {
      name: "DK",
      value: 0,
    },
    {
      name: "DH",
      value: 0,
    },
    {
      name: "Druid",
      value: 0,
    },
    {
      name: "Monk",
      value: 0,
    },
    {
      name: "Paladin",
      value: 0,
    },
    {
      name: "Warrior",
      value: 0,
    },
  ];
  healerClasses = [
    {
      name: "Priest",
      value: 0,
    },
    {
      name: "Shaman",
      value: 0,
    },
    {
      name: "Druid",
      value: 0,
    },
    {
      name: "Monk",
      value: 0,
    },
    {
      name: "Paladin",
      value: 0,
    },
  ];

  classColors = [
    {
      name: "Death Knight",
      value: "#C41F3B",
    },
    {
      name: "Demon Hunter",
      value: "#A330C9",
    },
    {
      name: "Druid",
      value: "#FF7D0A",
    },
    {
      name: "Hunter",
      value: "#A9D271",
    },
    {
      name: "Mage",
      value: "#40C7EB",
    },
    {
      name: "Monk",
      value: "#00FF96",
    },
    {
      name: "Paladin",
      value: "#F58CBA",
    },
    {
      name: "Priest",
      value: "#FFFFFF",
    },
    {
      name: "Rogue",
      value: "#FFF569",
    },
    {
      name: "Warlock",
      value: "#8787ED",
    },
    {
      name: "Shaman",
      value: "#0070DE",
    },
    {
      name: "Warrior",
      value: "#C79C6E",
    },
  ];
}
