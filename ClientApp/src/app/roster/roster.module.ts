import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RosterRoutingModule } from './roster-routing.module';
import { RosterComponent } from './roster.component';
import { RosterCardComponent } from './roster-card/roster-card.component';
import { RosterTableComponent } from './rosterTable/rosterTable.component';
import { SharedModule } from '../shared/shared.module';
import { NbSelectModule, NbButtonModule } from '@nebular/theme';
import { ClassesComponent } from './classes/classes.component';
import { TotalsComponent } from './totals/totals.component';

@NgModule({
  declarations: [RosterComponent, RosterCardComponent, RosterTableComponent, ClassesComponent, TotalsComponent],
  imports: [
    CommonModule,
    RosterRoutingModule,
    SharedModule,
    NbSelectModule,
    NbButtonModule
  ]
})
export class RosterModule { }
