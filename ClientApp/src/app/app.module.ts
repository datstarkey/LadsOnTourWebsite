import { WarcraftlogsService } from "./services/warcraftlogs/warcraftlogs.service";
import { TwitchService } from "./services/twitch/twitch.service";
import { HomeComponent } from "./main/home/home.component";
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
  NbToastrModule,
  NbSpinnerModule,
  NbCardModule,
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    HomeComponent,
    NavBarComponent,
    DashboardNavComponent,
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
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NbCardModule,
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
