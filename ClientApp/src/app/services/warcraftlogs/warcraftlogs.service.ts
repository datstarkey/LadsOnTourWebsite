import { ILogZone } from "./../../interfaces/logZone";
import { BehaviorSubject, Observable } from "rxjs";
import { ICharacter } from "./../../interfaces/character";
import { UserService } from "./../user/user.service";
import { Injectable } from "@angular/core";
import { ILogRanking } from "./../../interfaces/logRankings";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WarcraftlogsService {
  apiKey = new BehaviorSubject<string>("");
  private baseUrl: string = "https://www.warcraftlogs.com:443/v1/";
  private ApiKey: string;

  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.loggedIn.subscribe((result) => {
      if (result) {
        this.userService.getWarcraftLogsApiKey().subscribe((result) => {
          this.ApiKey = result;
          this.apiKey.next(result);
        });
      }
    });
  }

  openReportNewTab(reportId: string) {
    return `https://www.warcraftlogs.com/reports/${reportId}`;
  }

  getCharacterRankings(
    character: ICharacter,
    zone: number,
    metric: string
  ): Observable<ILogRanking[]> {
    return this.http.get<ILogRanking[]>(
      `${this.baseUrl}rankings/character/${character.name}/kazzak/eu?zone=${zone}&metric=${metric}&api_key=${this.ApiKey}`
    );
  }

  getZones(): Observable<ILogZone[]> {
    return this.http.get<ILogZone[]>(
      `${this.baseUrl}zones?api_key=${this.ApiKey}`
    );
  }
}
