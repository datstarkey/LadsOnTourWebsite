import { ThemeService } from "./../services/theme/theme.service";
import { UserService } from "./../services/user/user.service";
import { LoginService } from "./../services/login/login.service";
import { CookieService } from "ngx-cookie-service";
import { CharacterComponent } from "./../user-details/character/character/character.component";
import { ApplyComponent } from "./apply/apply.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { UserComponent } from "./../user-details/user/user/user.component";
import { UserDetailsComponent } from "./../user-details/user-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbCardModule,
  NbProgressBarModule,
  NbButtonModule,
} from "@nebular/theme";
import { BarChartColoredComponent } from "./components/bar-chart-colored.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LoginPageComponent } from "./login/login-page/login-page.component";

@NgModule({
  declarations: [BarChartColoredComponent, LoginPageComponent],
  imports: [CommonModule, NgxChartsModule, NbButtonModule],
  providers: [CookieService, LoginService, UserService, ThemeService],
  exports: [
    NbCardModule,
    NbProgressBarModule,
    BarChartColoredComponent,
    LoginPageComponent,
  ],
})
export class SharedModule {}
