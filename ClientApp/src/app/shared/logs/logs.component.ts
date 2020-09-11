import { ILogRanking } from "./../../interfaces/logRankings";
import { ILogZone } from "./../../interfaces/logZone";
import { ICharacter } from "./../../interfaces/character";
import { UserService } from "./../../services/user/user.service";
import { WarcraftlogsService } from "./../../services/warcraftlogs/warcraftlogs.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

interface IDifficulty {
  name: string;
  number: number;
}

interface logData {
  name: string;
  character: ICharacter;
  logs: ILogRanking;
}

interface logResultsData {}

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.scss"],
})
export class LogsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  rosterMains: ICharacter[];
  logData: logData[];

  defaultZone: number = 19;

  zone: ILogZone;
  zones: ILogZone[];

  difficulty: IDifficulty;
  difficulties: IDifficulty[] = [
    { name: "Normal", number: 3 },
    { name: "Heroic", number: 4 },
    { name: "Mythic", number: 5 },
  ];

  metric: string = "dps";
  metrics: string[] = ["dps", "hps", "bossdps"];

  constructor(
    private warcraftLogs: WarcraftlogsService,
    private userService: UserService
  ) {}

  async getLogs() {
    this.logData = [];
    this.rosterMains.forEach((main) => {
      this.getRankingsAsync(main);
    });
  }

  getRankingsAsync(character: ICharacter) {
    this.warcraftLogs
      .getCharacterRankings(character, this.zone.id, this.metric)
      .subscribe((result) => {
        let data: logData = {
          name: character.name,
          character: character,
          logs: result,
        };

        this.logData.push(data);
        console.log(this.logData);
      });
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.getRosterMains().subscribe((result) => {
        this.rosterMains = result;

        this.subscription.add(
          this.warcraftLogs.getZones().subscribe((result) => {
            this.zones = result;
            this.zone = this.zones.find((z) => z.id == this.defaultZone);
            this.getLogs();
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
