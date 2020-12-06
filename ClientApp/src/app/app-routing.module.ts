import { BisListComponent } from './shared/bis-list/bis-list.component';
import { RaidTimesComponent } from "./shared/raid-times/raid-times.component";
import { LogsComponent } from "./shared/logs/logs.component";
import { CalendarComponent } from "./shared/calendar/calendar.component";
import { AddonsComponent } from "./shared/addons/addons.component";
import { MainComponent } from "./main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { ApplyComponent } from "./shared/apply/apply.component";
import { ApplicationsComponent } from "./shared/applications/applications.component";
import { StreamsComponent } from "./shared/streams/streams.component";
import { UserDetailsComponent } from "./shared/user-details/user-details.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "main",
    component: MainComponent,
    children: [
      { path: "main", redirectTo: "home" },
      { path: "home", component: HomeComponent },
      { path: "apply", component: ApplyComponent },
      {
        path: "roster",
        loadChildren: "./shared/roster/roster.module#RosterModule",
      },
      { path: "streams", component: StreamsComponent },
      { path: "dashboard", redirectTo: "/dashboard/user", pathMatch: "full" },
    ],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "user", component: UserDetailsComponent },
      { path: "downloads", component: AddonsComponent },
      { path: "streams", component: StreamsComponent },
      { path: "apply", component: ApplyComponent },
      { path: "applications", component: ApplicationsComponent },
      { path: "calendar", component: CalendarComponent },
      { path: "logs", component: LogsComponent },
      { path: "raid", component: RaidTimesComponent },
      { path: "bis-list", component: BisListComponent },
      {
        path: "roster",
        loadChildren: "./shared/roster/roster.module#RosterModule",
      },
    ],
  },
  { path: "", redirectTo: "/main/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
