import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";
import { IUser } from "./../../../interfaces/user";
import { AbsencesService } from "./../../../services/absences/absences.service";
import { IAbsence } from "./../../../interfaces/absence";
import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-absences",
  templateUrl: "./absences.component.html",
  styleUrls: ["./absences.component.scss"],
})
export class AbsencesComponent implements OnInit {
  subscription: Subscription = new Subscription();
  @Input() user: IUser;

  today: Date = new Date();
  modal: boolean = false;
  modalStart: Date;
  modalEnd: Date;
  modalDescription: string;

  absenceList: IAbsence[] = [];

  constructor(
    private absencesService: AbsencesService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.absencesService.loggedIn.subscribe((result) => {
        if (result) {
          this.getAbsences();
        }
      })
    );
  }

  openModal() {
    this.modal = true;
    console.log(this.modal);
  }

  closeModal() {
    this.modal = false;
  }

  getLocalTime(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  addAbsence() {
    if (this.modalStart == null) {
      this.toastrService.danger("Start date can't be blank", "Start Date", {
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      });
      return;
    }

    if (this.modalEnd == null) {
      this.toastrService.danger("End date can't be blank", "End Date", {
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      });
      return;
    }

    let absence: IAbsence = {
      discordID: this.user.discordID,
      discord: this.user.discord,
      startTime: this.modalStart,
      endTime: this.modalEnd,
      description: this.modalDescription,
    };

    this.modal = false;
    this.absencesService.addAbsence(absence).subscribe((result) => {
      if (result.includes("Added")) {
        this.toastrService.success("Added Absence Successfully", "Added", {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });

        this.modalDescription = "";
        this.modalStart = null;
        this.modalEnd = null;
      } else {
        this.toastrService.danger("Error adding absence", "Error", {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });
      }
      this.getAbsences();
    });
  }

  deleteAbsence(absence: IAbsence) {
    this.absencesService.removeAbsence(absence).subscribe((result) => {
      if (result.includes("Removed")) {
        this.toastrService.success("Removed Absence Successfully", "Removed", {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });
      } else {
        this.toastrService.danger("Error removing absence", "Error", {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        });
      }
      this.getAbsences();
    });
  }

  getAbsences() {
    this.absencesService.getAbsences().subscribe((result) => {
      this.absenceList = result;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
