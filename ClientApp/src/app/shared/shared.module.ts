import { AbsencesService } from "./../services/absences/absences.service";
import { AbsencesComponent } from "./user-details/absences/absences.component";
import { RaidInfoComponent } from "./user-details/raid-info/raid-info.component";
import { ThemeService } from "./../services/theme/theme.service";
import { UserService } from "./../services/user/user.service";
import { LoginService } from "./../services/login/login.service";
import { WarcraftlogsService } from "./../services/warcraftlogs/warcraftlogs.service";
import { CookieService } from "ngx-cookie-service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbCardModule,
  NbProgressBarModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSelectModule,
  NbInputModule,
  NbAccordionModule,
  NbToastrModule,
  NbDatepickerModule,
} from "@nebular/theme";
import { BarChartColoredComponent } from "./components/bar-chart-colored.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { UserComponent } from "./user-details/user/user/user.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { CharacterComponent } from "./user-details/character/character/character.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AddonsComponent } from "./addons/addons.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { LogsComponent } from "./logs/logs.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { ApplyComponent } from "./apply/apply.component";
import { StreamsComponent } from "./streams/streams.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { RaidTimesComponent } from './raid-times/raid-times.component';
import { RaidComponent } from './raid/raid.component';
import { BisListComponent } from './bis-list/bis-list.component';

@NgModule({
  declarations: [
    BarChartColoredComponent,
    LoginPageComponent,
    RaidInfoComponent,
    AbsencesComponent,
    UserComponent,
    UserDetailsComponent,
    CharacterComponent,
    AddonsComponent,
    ApplyComponent,
    ApplicationsComponent,
    LogsComponent,
    StreamsComponent,
    CalendarComponent,
    RaidTimesComponent,
    RaidComponent,
    BisListComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    NbCardModule,
    NgxChartsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbInputModule,
    NbAccordionModule,
    NgxSpinnerModule,
    NbToastrModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NbDatepickerModule.forRoot(),
  ],
  providers: [
    CookieService,
    LoginService,
    UserService,
    ThemeService,
    WarcraftlogsService,
    AbsencesService,
  ],
  exports: [
    NbCardModule,
    NbProgressBarModule,
    NbCheckboxModule,
    BarChartColoredComponent,
    LoginPageComponent,
    RaidInfoComponent,
  ],
})
export class SharedModule {}
