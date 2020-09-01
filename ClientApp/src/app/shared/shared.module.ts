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
  exports: [
    NbCardModule,
    NbProgressBarModule,
    BarChartColoredComponent,
    LoginPageComponent,
  ],
})
export class SharedModule {}
