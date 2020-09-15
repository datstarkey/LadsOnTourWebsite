import { Component, OnInit } from "@angular/core";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { isSameDay, isSameMonth } from "date-fns";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  activeDayIsOpen: boolean = false;
  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: "Will",
      start: new Date(2020, 8, 16),
      end: new Date(2020, 8, 17),
      color: {
        primary: "#ad2121",
        secondary: "#FAE3E3",
      },
    },

    {
      title: "Clemmo",
      start: new Date(2020, 8, 15),
      end: new Date(2020, 8, 30),
      color: {
        primary: "#ad2121",
        secondary: "#FAE3E3",
      },
    },
  ];
  constructor() {}

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
  }

  ngOnInit() {}
}
