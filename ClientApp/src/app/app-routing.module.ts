import { CalendarComponent } from "./calendar/calendar.component";
import { AddonsComponent } from "./addons/addons.component";
import { StreamsComponent } from "./streams/streams.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ApplyComponent } from "./apply/apply.component";
import { HomeComponent } from "./home/home.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { ApplicationsComponent } from "./applications/applications.component";

const routes: Routes = [
  { path: "user", component: UserDetailsComponent },
  { path: "apply", component: ApplyComponent },
  { path: "applications", component: ApplicationsComponent },
  { path: "roster", loadChildren: "./roster/roster.module#RosterModule" },
  { path: "addons", component: AddonsComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "streams", component: StreamsComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
