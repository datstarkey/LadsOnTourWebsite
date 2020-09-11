import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";

@Component({
  selector: "app-rosterTable",
  templateUrl: "./rosterTable.component.html",
  styleUrls: ["./rosterTable.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RosterTableComponent implements OnInit {
  @Input() users: any[];
  @Input() sortRoster: Function;

  constructor() {}

  ngOnInit() {}
}

export class User {
  rank: string;
  discord: string;
  role: string;
  class: string;
  armory: string;
}
