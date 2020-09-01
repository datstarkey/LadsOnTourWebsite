import { Observable, BehaviorSubject } from "rxjs";
import { IApplication } from "./../../interfaces/application";
import { NbToastrService } from "@nebular/theme";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "./../login/login.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApplicationsService {
  application = new BehaviorSubject<IApplication>({} as any);
  applications = new BehaviorSubject<IApplication[]>({} as any);

  admin: boolean;

  baseUrl: string = document.getElementsByTagName("base")[0].href.toString();
  appApiUrl = this.baseUrl + "api/v1/application";

  private headers;

  constructor(private loginService: LoginService, private http: HttpClient) {
    loginService.loggedIn.subscribe((response) => {
      if (response == true) {
        this.headers = new HttpHeaders({
          Authorization: `Bearer ${this.loginService.jwtToken}`,
        });
        this.getApplication();
      }
    });

    loginService.admin.subscribe((response) => {
      this.admin = response;
    });
  }

  nonAdminToast() {
    this.loginService.showToast(
      "Error with login please refresh",
      "Not Admin",
      "danger",
      "bottom-right"
    );
  }

  sortApplications(apps: IApplication[]) {
    var element = { current: [], accepted: [], declined: [] };
    if (apps.length > 0) {
      apps.forEach((app) => {
        if (app.appStatus == "Sent") {
          element.current.push(app);
        }

        if (app.appStatus == "Accepted") {
          element.accepted.push(app);
        }

        if (app.appStatus == "Declined") {
          element.declined.push(app);
        }
      });
    }

    return element;
  }

  getApplication() {
    var headers = this.headers;
    this.http
      .get<IApplication>(this.appApiUrl, { headers })
      .subscribe((response) => {
        this.application.next(response);
      });
  }

  getAllApplications() {
    var headers = this.headers;
    var url = `${this.appApiUrl}/all`;
    console.log(url);
    this.http
      .get<IApplication[]>(url, { headers })
      .subscribe((response) => {
        this.applications.next(response);
      });
  }

  submitApp(app: IApplication): Observable<string> {
    var headers = this.headers;
    return this.http.post(this.baseUrl + "api/v1/users", app, {
      headers,
      responseType: "text",
    });
  }

  submitAdminApp(app: IApplication): Observable<string> {
    var headers = this.headers;
    return this.http.post(this.appApiUrl, app, {
      headers,
      responseType: "text",
    });
  }

  adminUpdateApp(app: IApplication, status: string) {
    if (this.admin) {
      app.appStatus = status;
      console.log(app);
      this.submitAdminApp(app).subscribe((response) => {
        this.loginService.showToast(
          `App was changed to ${status}`,
          "Success",
          "success",
          "bottom-right"
        );
        this.getAllApplications();
      });
    } else {
      this.nonAdminToast();
    }
  }
}
