import { Subscription } from "rxjs";
import { IApplication } from "../../interfaces/application";
import { ApplicationsService } from "../../services/applications/applications.service";
import { WowService } from "../../services/wow/wow.service";
import { LoginService } from "../../services/login/login.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-apply",
  templateUrl: "./apply.component.html",
  styleUrls: ["./apply.component.scss"],
})
export class ApplyComponent implements OnInit {
  app: IApplication = {} as any;
  loggedIn: boolean;
  buttonText: string = "Submit";
  subscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private applicationsService: ApplicationsService,
    private wowService: WowService
  ) {}

  badToast() {
    this.loginService.showToast(
      "Please try again",
      "Error updating application",
      "danger",
      "bottom-right"
    );
  }

  getApp() {
    this.subscription.add(
      this.applicationsService.application.subscribe((app) => {
        if (app.appStatus == null || app.appStatus == "") {
          app.appStatus = "Not Sent";
        }
        console.log(this.app);
        this.app = app;
      })
    );
  }

  save() {
    this.app.appStatus = "Sent";
    console.log(this.app);
    this.applicationsService.submitApp(this.app).subscribe(
      (response) => {
        if (response.indexOf("successfully") > -1) {
          this.loginService.showToast(
            "Application sent successfully",
            "Success",
            "success",
            "bottom-right"
          );
        }
      },
      (error) => {
        console.log(error);
        this.badToast();
      }
    );
  }

  update() {
    this.app.appStatus = "Not Sent";
    this.applicationsService.submitApp(this.app).subscribe((response) => {
      if (response.indexOf("successfully") > -1) {
        this.loginService.showToast(
          "Application updated succesfully",
          "Success",
          "warning",
          "bottom-right"
        );
      } else {
        this.badToast();
      }
    });
  }

  withdraw() {
    this.app.appStatus = "Not Sent";
    this.applicationsService.submitApp(this.app).subscribe((response) => {
      if (response.indexOf("successfully") - 1) {
        this.loginService.showToast(
          "Application withdrawn successfully",
          "Success",
          "danger",
          "bottom-right"
        );
      } else {
        this.badToast();
      }
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.loginService.loggedIn.subscribe((response) => {
        this.loggedIn = response;
        if (response == true) {
          this.applicationsService.getApplication();
          this.getApp();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
