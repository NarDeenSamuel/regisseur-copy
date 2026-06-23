import { Component } from '@angular/core';
import { ProducersHeaderComponent } from "./producers-header/producers-header.component";
import { ProducersCardsComponent } from "./producers-cards/producers-cards.component";
import { ProducersTableComponent } from "./producers-table/producers-table.component";

@Component({
  selector: 'app-dashboard-producers',
  imports: [ProducersHeaderComponent, ProducersCardsComponent, ProducersTableComponent],
  templateUrl: './dashboard-producers.component.html',
  styleUrl: './dashboard-producers.component.css'
})
export class DashboardProducersComponent {

}
