import { IRosterUser } from "./../../interfaces/rosterUser";
import { ICharacter } from "./../../interfaces/character";
import { IUser } from "./../../interfaces/user";
import { Injectable, OnInit } from "@angular/core";
import { LoginService } from "../login/login.service";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { NbComponentStatus, NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class UserService {
  loggedIn = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<IUser>({} as any);
  characters = new BehaviorSubject<ICharacter[]>({} as any);
  accessToken: string;
  baseUrl: string =
    document.getElementsByTagName("base")[0].href.toString() + "api/v1/users";

  private headers;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private toastrService: NbToastrService
  ) {
    this.loginService.loggedIn.subscribe((response) => {
      this.loggedIn.next(response);
      if (response) {
        this.headers = new HttpHeaders({
          Authorization: `Bearer ${this.loginService.jwtToken}`,
        });
        this.getUser();
        this.getCharacters();
      }
    });

    this.loginService.battleNetSynced.subscribe((response) => {
      if (response) {
        this.getUser();
        this.getCharacters();
      }
    });
  }

  showToast(title, response, status: NbComponentStatus, position) {
    this.toastrService.show(response.toString(), title, { status, position });
  }

  badToast() {
    this.showToast(
      "Error",
      "Error unknown reason because I don't want to error log yet",
      "danger",
      "bottom-right"
    );
  }

  updateUser(user: IUser) {
    this.setUserData(user).subscribe((response) => {
      if (response.indexOf("successfully") > -1) {
        this.showToast(
          "Updated",
          "Profile was updated correctly",
          "success",
          "bottom-right"
        );
        this.getUser();
      } else {
        this.badToast();
      }
    });
  }

  updateCharacter(character: ICharacter, isMain: boolean, showToast = true) {
    this.setCharacterData(character, isMain).subscribe((response) => {
      console.log(response);
      if (response.indexOf("Successful") > -1) {
        if (showToast) {
          this.showToast(
            "Updated",
            "Profile was updated correctly",
            "success",
            "bottom-right"
          );
        }
        this.getCharacters();
        this.getUser();
        this.loginService.refreshLogin();
      } else {
        this.badToast();
      }
    });
  }

  submitData(user: IUser, type) {
    this.setUserData(user).subscribe((response) => {
      if (response.indexOf("Successful") > -1) {
        switch (type) {
          case "withdraw":
            this.showToast(
              "Withdrawn",
              "Application successfully Withdrawn",
              "danger",
              "bottom-right"
            );
            break;

          case "update":
            this.showToast(
              "Saved",
              "Application saved as draft",
              "warning",
              "bottom-right"
            );
            break;

          case "send":
            this.showToast(
              "Sent",
              "Application was sent successfully",
              "success",
              "bottom-right"
            );
            break;
          default:
            this.showToast(
              "Saved",
              "Updated Profile Successfully",
              "success",
              "bottom-right"
            );
            break;
        }
        this.getUser();
      }
    });
  }

  getCharacters() {
    const headers = this.headers;
    this.http
      .get<ICharacter[]>(`${this.baseUrl}/characters`, {
        headers,
      })
      .subscribe((response) => {
        this.characters.next(response);
      });
  }

  getUser() {
    const headers = this.headers;
    this.http
      .get<IUser>(this.baseUrl, { headers })
      .subscribe((response) => {
        this.user.next(response);
      });
  }

  adminUpdateAllUsers() {
    this.showToast("Updating", "Updating all users", "info", "bottom-right");
    const headers = this.headers;
    this.http
      .post(
        `${this.baseUrl}/updateall`,
        {},
        {
          headers,
        }
      )
      .subscribe(
        (result) => {},
        (error) => {
          if (error.status == 200) {
            this.showToast(
              "Saved",
              "Finished Updating all users",
              "success",
              "bottom-right"
            );
          } else {
            this.showToast("Error", `error - `, "danger", "bottom-right");
          }
        }
      );
  }

  getWarcraftLogsApiKey(): Observable<any> {
    const headers = this.headers;
    return this.http.get<any>(`${this.baseUrl}/warcraftlogs`, { headers });
  }

  getRosterMains(): Observable<ICharacter[]> {
    const headers = this.headers;
    return this.http.get<ICharacter[]>(`${this.baseUrl}/allMains`, { headers });
  }

  getRosterData(): Observable<IRosterUser[]> {
    return this.http.get<IRosterUser[]>(`${this.baseUrl}/roster`);
  }

  setUserData(user: IUser): Observable<string> {
    const headers = this.headers;
    return this.http.post(this.baseUrl, user, {
      headers,
      responseType: "text",
    });
  }

  setCharacterData(character: ICharacter, isMain: Boolean): Observable<string> {
    const headers = this.headers;
    return this.http.post(
      `${this.baseUrl}/character?main=${isMain}`,
      character,
      {
        headers,
        responseType: "text",
      }
    );
  }

  clearMain(): Observable<string> {
    var headers = this.headers;
    return this.http.post(
      `${this.baseUrl}/clearmain`,
      {},
      {
        headers,
        responseType: "text",
      }
    );
  }
}
