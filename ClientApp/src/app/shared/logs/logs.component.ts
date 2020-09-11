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
  logs: ILogRanking[];
}

interface tableRow {
  name: string;
  average: number;
  percentiles: tableLog[];
}

interface tableLog {
  display: string;
  url: string;
}

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

  headers: string[];
  tableData: tableLog[];

  difficulties: IDifficulty[] = [
    { name: "Normal", number: 3 },
    { name: "Heroic", number: 4 },
    { name: "Mythic", number: 5 },
  ];

  difficulty: IDifficulty = this.difficulties[1];

  metric: string = "dps";
  metrics: string[] = ["dps", "hps", "bossdps"];

  constructor(
    private warcraftLogs: WarcraftlogsService,
    private userService: UserService
  ) {}

  async getLogs() {
    console.log("Getting Logs");
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

  filterLog() {
    //Clear table data
    let tableData = [];

    //for each person we have logs for
    this.logData.forEach((person) => {
      //create a new tablerow
      let row: tableRow = {
        name: person.name,
        average: 0,
        percentiles: [],
      };

      //Add percentile for each boss
      this.headers.forEach((boss) => {
        let log = person.logs.find((log) => {
          log.encounterName == boss;
        });
        let data: tableLog = {
          display: log.percentile.toString(),
          url: log.reportID,
        };
        row.percentiles.push(data);
      });

      //Add to table
      tableData.push(row);
    });
  }

  changeZone() {
    this.headers = this.zone.encounters.map((e) => e.name);
    this.getLogs();
  }

  changeMetric(metric) {
    this.metric = metric;
    this.getLogs();
  }

  changeDifficulty(difficulty: IDifficulty) {
    this.difficulty = difficulty;
  }

  getCharacters() {
    this.subscription.add(
      this.userService.getRosterMains().subscribe((result) => {
        this.rosterMains = result;

        this.subscription.add(
          this.warcraftLogs.apiKey.subscribe((result) => {
            console.log(result);
            if (result.length > 0) {
              this.subscription.add(
                this.warcraftLogs.getZones().subscribe((result) => {
                  this.zones = result;
                  this.zone = this.zones.find((z) => z.id == this.defaultZone);
                  this.headers = this.zone.encounters.map((e) => e.name);
                  this.getLogs();
                })
              );
            }
          })
        );
      })
    );
  }

  ngOnInit() {
    this.getCharacters();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
