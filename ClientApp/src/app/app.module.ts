import { CalendarComponent } from "./shared/calendar/calendar.component";
import { LogsComponent } from "./shared/logs/logs.component";
import { WarcraftlogsService } from "./services/warcraftlogs/warcraftlogs.service";
import { TwitchService } from "./services/twitch/twitch.service";
import { AddonsComponent } from "./shared/addons/addons.component";
import { StreamsComponent } from "./shared/streams/streams.component";
import { CharacterComponent } from "./shared/user-details/character/character/character.component";
import { ApplicationsComponent } from "./shared/applications/applications.component";
import { ApplyComponent } from "./shared/apply/apply.component";
import { HomeComponent } from "./main/home/home.component";
import { UserDetailsComponent } from "./shared/user-details/user-details.component";
import { UserComponent } from "./shared/user-details/user/user/user.component";
import { ThemeService } from "./services/theme/theme.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbIconModule,
  NbButtonModule,
  NbDatepickerModule,
  NbSelectModule,
  NbInputModule,
  NbToggleModule,
  NbContextMenuModule,
  NbToastrModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbAccordionModule,
} from "@nebular/theme";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "./services/login/login.service";
import { UserService } from "./services/user/user.service";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainComponent } from "./main/main.component";
import { NavBarComponent } from "./main/nav-bar/nav-bar.component";
import { DashboardNavComponent } from "./dashboard/dashboard-nav/dashboard-nav.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    HomeComponent,
    NavBarComponent,
    UserComponent,
    UserDetailsComponent,
    CharacterComponent,
    ApplyComponent,
    ApplicationsComponent,
    DashboardNavComponent,
    StreamsComponent,
    AddonsComponent,
    LogsComponent,
    CalendarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    SharedModule,
    AppRoutingModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbToggleModule,
    NbContextMenuModule,
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NbCheckboxModule,
    NbAccordionModule,
    NgxSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    CookieService,
    LoginService,
    UserService,
    ThemeService,
    TwitchService,
    WarcraftlogsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
