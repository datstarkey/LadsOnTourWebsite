import { Component, OnInit } from "@angular/core";
import { Url } from "url";

interface addon {
  name: string;
  type: string;
  link: string;
}

@Component({
  selector: "app-addons",
  templateUrl: "./addons.component.html",
  styleUrls: ["./addons.component.scss"],
})
export class AddonsComponent implements OnInit {
  mandatory: addon[] = [
    {
      name: "WeakAuras2",
      type: "Addon",
      link: "https://www.curseforge.com/wow/addons/weakauras-2",
    },

    {
      name: "RCLootCouncil",
      type: "Addon",
      link: "https://www.curseforge.com/wow/addons/rclootcouncil",
    },

    {
      name: "BigWigs",
      type: "Addon",
      link: "https://www.curseforge.com/wow/addons/big-wigs",
    },

    {
      name: "Or DBM",
      type: "Addon",
      link: "https://www.curseforge.com/wow/addons/deadly-boss-mods",
    },
  ];

  suggested: addon[] = [
    {
      name: "Castle Of Natharia WeakAuras",
      type: "WeakAura",
      link: "",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
