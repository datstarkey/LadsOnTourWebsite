import { ILogRanking } from "./../../interfaces/logRankings";
import { ILogZone } from "./../../interfaces/logZone";
import { ICharacter } from "./../../interfaces/character";
import { UserService } from "./../../services/user/user.service";
import { WarcraftlogsService } from "./../../services/warcraftlogs/warcraftlogs.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

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

interface loading {
  current: number;
  max: number;
  isLoading: boolean;
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

  loading: loading = {
    current: 0,
    max: 0,
    isLoading: false,
  };

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

  raids: string[] = [
    "Throne of Thunder",
    "Siege of Orgrimmar",
    "Highmaul",
    "Blackrock Foundry",
    "Hellfire Citadel",
    "Emerald Nightmare",
    "The Nighthold",
    "Trial of Valor",
    "Tomb of Sargeras",
    "Antorus, The Burning Throne",
    "Uldir",
    "Battle of Dazar'alor",
    "Cruicible of Storms",
    "The Eternal Palace",
    "Ny'alotha",
  ];

  constructor(
    private warcraftLogs: WarcraftlogsService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  async getLogs() {
    this.loading = {
      current: 0,
      max: this.rosterMains.length,
      isLoading: true,
    };
    this.spinner.show();
    this.logData = [];
    this.tableData = [];
    this.rosterMains.forEach((main) => {
      this.getRankingsAsync(main);
    });
  }

  getRankingsAsync(character: ICharacter) {
    this.warcraftLogs
      .getCharacterRankings(character, this.zone.id, this.metric)

      .subscribe(
        (res) => this.createDataLog(res, character),
        (err) => this.handleError(err)
      );
  }

  handleError(error) {
    console.log("error");
    this.increaseLoading();
  }

  createDataLog(result, character) {
    let data: logData = {
      name: character.name,
      character: character,
      logs: result,
    };
    this.logData.push(data);
    this.increaseLoading();
    this.filterLog();
  }

  increaseLoading() {
    this.loading.current++;

    if (this.loading.current >= this.loading.max) {
      this.loading.isLoading = false;
      this.spinner.hide();
    }
  }

  filterLog() {
    this.tableData = [];
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

      let total = 0;
      let bossNumber = 0;
      //Add percentile for each boss
      this.headers.forEach((boss) => {
        //Sort Logs by Boss and difficulty
        let log: ILogRanking;
        let logs = person.logs.filter((log) => {
          return (
            log.difficulty == this.difficulty.number &&
            log.encounterName == boss
          );
        });

        //return highest percentile log
        if (logs) {
          logs = logs.sort((a, b) => (a.percentile < b.percentile ? 1 : -1));
          log = logs[0];
        }

        //enter log data
        let data: tableLog;
        if (log) {
          data = {
            display: Math.round(log.percentile).toString(),
            url: log.reportID,
          };
          total += Math.round(log.percentile);
          bossNumber++;
        } else {
          data = {
            display: "N/A",
            url: null,
          };
        }
        row.percentiles.push(data);
      });

      if (bossNumber > 0) {
        let average = total / bossNumber;
        row.average = Math.round(average * 10) / 10;
      } else {
        row.average = 0;
      }

      //Add to table
      tableData.push(row);

      tableData = tableData.sort((a, b) => (a.average < b.average ? 1 : -1));
      this.tableData = tableData;
    });
  }

  roundPercentile(value: string) {
    if (value != "N/A") {
      let number = parseInt(value);
      return Math.round(number);
    }
    return value;
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
    this.filterLog();
  }

  getCharacters() {
    this.subscription.add(
      this.userService.getRosterMains().subscribe((result) => {
        this.rosterMains = result;

        this.subscription.add(
          this.warcraftLogs.apiKey.subscribe((result) => {
            if (result != null && result.length > 0) {
              this.subscription.add(
                this.warcraftLogs.getZones().subscribe((result) => {
                  this.zones = result.filter((zone) =>
                    this.raids.includes(zone.name)
                  );
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

  getColor(value: string) {
    if (value != "N/A") {
      let number = parseInt(value);

      if (number >= 100) {
        return "gold";
      } else if (number == 99) {
        return "pink";
      } else if (number < 99 && number >= 95) {
        return "orange";
      } else if (number < 95 && number >= 76) {
        return "purple";
      } else if (number < 76 && number >= 50) {
        return "blue";
      } else {
        return "green";
      }
    }
  }

  ngOnInit() {
    this.getCharacters();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
