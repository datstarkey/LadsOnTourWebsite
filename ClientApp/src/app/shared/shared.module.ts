import { ThemeService } from "./../services/theme/theme.service";
import { UserService } from "./../services/user/user.service";
import { LoginService } from "./../services/login/login.service";
import { CookieService } from "ngx-cookie-service";

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
import { RaidInfoComponent } from "./user-details/raid-info/raid-info.component";

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
