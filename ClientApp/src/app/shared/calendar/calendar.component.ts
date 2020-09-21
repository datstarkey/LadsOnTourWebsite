import { Component, OnInit } from "@angular/core";
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from "angular-calendar";
import { IRosterUser } from "./../../interfaces/rosterUser";
import { UserService } from "./../../services/user/user.service";
import { isSameDay, isSameMonth } from "date-fns";
import { Subscription } from "rxjs";
import { AbsencesService } from "../../services/absences/absences.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  subscription: Subscription = new Subscription();
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen: boolean = false;
  viewDate = new Date();
  roster: IRosterUser[];
  raidersOnDay: number = 0;
  locale: string = "en";

  excludeDays: number[] = [5, 6];
  weekStartsOn = DAYS_OF_WEEK.WEDNESDAY;

  events: CalendarEvent[] = [];
  constructor(
    private userService: UserService,
    private absencesService: AbsencesService
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    this.raidersOnDay = this.roster.length - events.length;
  }

  getAbsences() {
    this.absencesService.getAllAbsences().subscribe((result) => {
      console.log(result);
      if (result) {
        this.events = [];

        result.forEach((absence) => {
          let event: CalendarEvent = {
            title: absence.discord,
            start: new Date(absence.startTime),
            end: new Date(absence.endTime),
            color: {
              primary: "#ad2121",
              secondary: "#FAE3E3",
            },
          };

          this.events.push(event);
        });
      }
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.getRosterData().subscribe((data) => {
        this.roster = data;
        this.raidersOnDay = this.roster.length;
      })
    );

    this.subscription.add(
      this.absencesService.loggedIn.subscribe((result) => {
        if (result) {
          this.getAbsences();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
