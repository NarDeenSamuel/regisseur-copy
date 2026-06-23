import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketingHeaderComponent } from "./ticketing-header/ticketing-header.component";
import { TicketingCardsComponent } from "./ticketing-cards/ticketing-cards.component";
import { TicketingTablesComponent } from './ticketing-tables/ticketing-tables.component';

@Component({
  selector: 'app-dashboard-ticketing',
  imports: [TicketingHeaderComponent, TicketingCardsComponent,TicketingTablesComponent],
  templateUrl: './dashboard-ticketing.component.html',
  styleUrl: './dashboard-ticketing.component.css'
})
export class DashboardTicketingComponent {

}
