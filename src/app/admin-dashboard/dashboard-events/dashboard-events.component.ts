import { Component } from '@angular/core';
import { EventHeaderComponent } from "./event-header/event-header.component";
import { EventCardesComponent } from "./event-cardes/event-cardes.component";
import { EventTableComponent } from "./event-table/event-table.component";

@Component({
  selector: 'app-dashboard-events',
  standalone: true,
  imports: [
    EventHeaderComponent,
    EventCardesComponent,
    EventTableComponent
],
  templateUrl: './dashboard-events.component.html',
  styleUrl: './dashboard-events.component.css'
})

export class DashboardEventsComponent {


}
