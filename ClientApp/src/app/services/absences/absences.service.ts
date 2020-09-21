import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAbsence } from "../../interfaces/absence";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: "root",
})
export class AbsencesService {
  loggedIn = new BehaviorSubject<boolean>(false);

  baseUrl: string =
    document.getElementsByTagName("base")[0].href.toString() +
    "api/v1/absences";
  private headers;

  constructor(private loginService: LoginService, private http: HttpClient) {
    this.loginService.loggedIn.subscribe((response) => {
      if (response) {
        this.loggedIn.next(response);
        this.headers = new HttpHeaders({
          Authorization: `Bearer ${this.loginService.jwtToken}`,
        });
      }
    });
  }

  getAllAbsences(): Observable<IAbsence[]> {
    return this.http.get<IAbsence[]>(`${this.baseUrl}/all`, {
      headers: this.headers,
    });
  }

  getAbsences(): Observable<IAbsence[]> {
    return this.http.get<IAbsence[]>(`${this.baseUrl}`, {
      headers: this.headers,
    });
  }

  addAbsence(absence: IAbsence): Observable<string> {
    return this.http.post(this.baseUrl, absence, {
      headers: this.headers,
      responseType: "text",
    });
  }

  removeAbsence(absence: IAbsence): Observable<string> {
    return this.http.request("delete", this.baseUrl, {
      body: absence,
      headers: this.headers,
      responseType: "text",
    });
  }
}
