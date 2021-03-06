import { Component, OnInit } from "@angular/core";
import { IApplication } from "../../interfaces/application";
import { LoginService } from "../../services/login/login.service";
import { ApplicationsService } from "../../services/applications/applications.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  loggedIn: boolean;
  buttonText: string = "Submit";
  applications = { current: [], accepted: [], declined: [] };
  app: IApplication;
  admin: boolean;
  isAppCurrent: boolean = true;

  constructor(
    private loginService: LoginService,
    private applicationsService: ApplicationsService
  ) {}

  selectApp(app: IApplication) {
    this.app = app;
    console.log(app);
    this.app.appStatus == "Sent"
      ? (this.isAppCurrent = true)
      : (this.isAppCurrent = false);
  }

  adminUpdateApp(status: string) {
    if (this.admin) {
      this.applicationsService.adminUpdateApp(this.app, status);
    }
  }

  ngOnInit() {
    this.subscription.add(
      this.loginService.loggedIn.subscribe((response) => {
        this.loggedIn = response;
        if (response == true) {
          this.applicationsService.getAllApplications();
          this.applicationsService.applications.subscribe((response) => {
            this.applications = this.applicationsService.sortApplications(
              response
            );
            if (this.applications.current.length > 0) {
              this.app = this.applications.current[0];
            }
          });
        }
      })
    );
    this.subscription.add(
      this.loginService.admin.subscribe((response) => {
        this.admin = response;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
