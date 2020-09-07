import { AddonsComponent } from "./shared/addons/addons.component";
import { MainComponent } from "./main/main.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./main/home/home.component";
import { ApplyComponent } from "./shared/apply/apply.component";
import { ApplicationsComponent } from "./shared/applications/applications.component";
import { StreamsComponent } from "./shared/streams/streams.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "main",
    component: MainComponent,
    children: [
      { path: "main", redirectTo: "home" },
      { path: "home", component: HomeComponent },
      { path: "apply", component: ApplyComponent },
      { path: "applications", component: ApplicationsComponent },
      { path: "roster", loadChildren: "./roster/roster.module#RosterModule" },
      { path: "streams", component: StreamsComponent },
      { path: "user", component: UserDetailsComponent },
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
      { path: "roster", loadChildren: "./roster/roster.module#RosterModule" },
    ],
  },
  { path: "", redirectTo: "/main/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
