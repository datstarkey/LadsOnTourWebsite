import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-roster-card",
  templateUrl: "./roster-card.component.html",
  styleUrls: ["./roster-card.component.scss"],
})
export class RosterCardComponent implements OnInit {
  @Input() users: any[];

  constructor() {}

  count;
  roles = [];
  classes = [];
  data = [];
  filteredRole = "Role";
  filteredClass = "Class";

  ngOnInit() {
    this.count = this.users.length;
    this.getFilters();
    this.filter();
  }

  ngOnChanges() {
    this.filter();
  }

  reset() {
    this.filteredRole = "Role";
    this.filteredClass = "Class";
    this.filter();
  }

  getFilters() {
    this.roles = [];
    this.classes = [];
    this.users.forEach((user) => {
      if (!this.roles.includes(user.role)) this.roles.push(user.role);

      if (!this.classes.includes(user.class)) this.classes.push(user.class);
    });
  }

  filter() {
    this.data = this.users.filter((user) => {
      var classCorrect = false;
      var roleCorrect = false;

      if (user.class == this.filteredClass || this.filteredClass == "Class") {
        classCorrect = true;
      }
      if (this.filteredRole == "Role" || user.role == this.filteredRole) {
        roleCorrect = true;
      }

      if (classCorrect && roleCorrect) {
        return true;
      }
    });
  }
}
