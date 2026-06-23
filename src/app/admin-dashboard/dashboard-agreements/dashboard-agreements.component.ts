import { Component } from '@angular/core';
import { AgreementsHeaderComponent } from "./agreements-header/agreements-header.component";
import { AgreementsCardsComponent } from "./agreements-cards/agreements-cards.component";
import { AgreementsTableComponent } from './agreements-table/agreements-table.component';

@Component({
  selector: 'app-dashboard-agreements',
  imports: [AgreementsHeaderComponent, AgreementsCardsComponent, AgreementsTableComponent],
  templateUrl: './dashboard-agreements.component.html',
  styleUrl: './dashboard-agreements.component.css'
})
export class DashboardAgreementsComponent {

}
