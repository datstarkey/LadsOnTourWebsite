import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bar-chart-colored",
  templateUrl: "./bar-chart-colored.component.html",
  styleUrls: ["./bar-chart-colored.component.scss"],
})
export class BarChartColoredComponent {
  @Input() data: any[];

  graphData: any[];

  updateCharts() {
    this.graphData = [...this.data];
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  showGridLines = false;
  showDataLabel = false;
  noBarWhenZero = false;

  axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return "";
    }
  }

  ngAfterViewInit() {
    this.updateCharts();
  }

  customColors = [
    {
      name: "DK",
      value: "#C41F3B",
    },
    {
      name: "DH",
      value: "#A330C9",
    },
    {
      name: "Druid",
      value: "#FF7D0A",
    },
    {
      name: "Hunter",
      value: "#A9D271",
    },
    {
      name: "Mage",
      value: "#40C7EB",
    },
    {
      name: "Monk",
      value: "#00FF96",
    },
    {
      name: "Paladin",
      value: "#F58CBA",
    },
    {
      name: "Priest",
      value: "#FFFFFF",
    },
    {
      name: "Rogue",
      value: "#FFF569",
    },
    {
      name: "Shaman",
      value: "#0070DE",
    },
    {
      name: "Warlock",
      value: "#8787ED",
    },
    {
      name: "Warrior",
      value: "#C79C6E",
    },
  ];

  onSelect(event) {
    console.log(event);
  }
}
