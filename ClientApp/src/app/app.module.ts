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
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HomeComponent } from "./home/home.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { ApplyComponent } from "./apply/apply.component";
import { LoginService } from "./services/login/login.service";
import { UserService } from "./services/user/user.service";
import { FormsModule } from "@angular/forms";
import { StreamsComponent } from "./streams/streams.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { AddonsComponent } from "./addons/addons.component";
import { UserComponent } from "./user-details/user/user/user.component";
import { CharacterComponent } from "./user-details/character/character/character.component";
import { ApplicationsComponent } from "./applications/applications.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UserDetailsComponent,
    ApplyComponent,
    StreamsComponent,
    CalendarComponent,
    AddonsComponent,
    UserComponent,
    CharacterComponent,
    ApplicationsComponent,
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
  ],
  providers: [CookieService, LoginService, UserService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
