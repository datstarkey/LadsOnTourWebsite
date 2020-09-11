import { IRosterUser } from "./../../../interfaces/rosterUser";
import { Component, OnInit, Input } from "@angular/core";

interface sortType {
  property: string;
  ascending: boolean;
}
@Component({
  selector: "app-roster-card",
  templateUrl: "./roster-card.component.html",
  styleUrls: ["./roster-card.component.scss"],
})
export class RosterCardComponent implements OnInit {
  @Input() users: any[];
  sortRosterBound: Function;

  constructor() {}

  count: number;
  roles: string[] = [];
  classes: string[] = [];
  data: IRosterUser[] = [];
  filteredRole: string = "Role";
  filteredClass: string = "Class";
  lastSort: string;
  sortableProperties: string[] = [
    "rankNumber",
    "nickname",
    "role",
    "class",
    "armory",
  ];

  IsAscending: sortType[] = [
    {
      property: "rankNumber",
      ascending: true,
    },
    {
      property: "nickname",
      ascending: false,
    },
    {
      property: "role",
      ascending: false,
    },
    {
      property: "class",
      ascending: true,
    },
    {
      property: "armory",
      ascending: false,
    },
  ];

  ngOnInit() {
    this.sortRosterBound = this.sortRoster.bind(this);
    this.count = this.users.length;

    this.getFilters();
    this.filter();
    this.sortRoster("class");
    this.sortRoster("role");
    this.sortRoster("rankNumber");
  }

  ngOnChanges() {
    this.filter();
  }

  sortRoster(property: string) {
    if (this.sortableProperties.includes(property)) {
      let sortType = this.IsAscending.find((s) => s.property == property);

      console.log(sortType);
      if (sortType.ascending) {
        this.data = this.data.sort((a, b) =>
          a[property] > b[property] ? 1 : -1
        );
      } else {
        this.data = this.data.sort((a, b) =>
          a[property] < b[property] ? 1 : -1
        );
      }
      sortType.ascending = !sortType.ascending;
      this.lastSort = property;
    }
  }

  reset() {
    this.filteredRole = "Role";
    this.filteredClass = "Class";
    this.filter();
    this.sortRoster(this.lastSort);
    this.sortRoster(this.lastSort);
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
