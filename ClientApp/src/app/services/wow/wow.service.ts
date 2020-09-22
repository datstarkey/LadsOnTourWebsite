import { Injectable } from "@angular/core";
import { NbComponentStatus, NbToastrService } from "@nebular/theme";
import { of } from "rxjs";

interface wowClassType {
  name: string;
  roles: string[];
}

@Injectable({
  providedIn: "root",
})
export class WowService {
  roles = ["Tank", "Melee", "Healer", "Ranged"];
  classes: wowClassType[] = [
    {
      name: "Death Knight",
      roles: ["Tank", "Melee"],
    },
    {
      name: "Demon Hunter",
      roles: ["Tank", "Melee"],
    },
    {
      name: "Druid",
      roles: ["Tank", "Melee", "Healer", "Ranged"],
    },
    {
      name: "Hunter",
      roles: ["Melee", "Ranged"],
    },
    {
      name: "Mage",
      roles: ["Ranged"],
    },
    {
      name: "Monk",
      roles: ["Tank", "Melee", "Healer"],
    },
    {
      name: "Paladin",
      roles: ["Tank", "Melee", "Healer"],
    },
    {
      name: "Priest",
      roles: ["Healer", "Ranged"],
    },
    {
      name: "Rogue",
      roles: ["Melee"],
    },
    {
      name: "Warlock",
      roles: ["Ranged"],
    },
    {
      name: "Shaman",
      roles: ["Melee", "Healer", "Ranged"],
    },
    {
      name: "Warrior",
      roles: ["Tank", "Melee"],
    },
  ];

  constructor(private toastrService: NbToastrService) {}

  showToast(title, response, status: NbComponentStatus, position) {
    this.toastrService.show(response.toString(), title, { status, position });
  }

  filterRoles(className): string[] {
    if (className == "TBC") {
      return this.roles;
    }

    return this.classes.find((c) => c.name == className).roles;
  }

  getClassesWithRole(role: string): string[] {
    return this.classes
      .filter((c) => {
        return c.roles.includes(role);
      })
      .map((c) => {
        return c.name;
      });
  }

  getClasses(): string[] {
    var element: string[] = [];
    this.classes.forEach((c) => {
      element.push(c.name);
    });
    return element;
  }
}
