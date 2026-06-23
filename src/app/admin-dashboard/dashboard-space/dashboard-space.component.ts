import { Component } from '@angular/core';
import { SpaceHeaderComponent } from "./space-header/space-header.component";
import { SpaceCardsComponent } from "./space-cards/space-cards.component";
import { SpaceTablesComponent } from "./space-tables/space-tables.component";

@Component({
  selector: 'app-dashboard-space',
  imports: [SpaceHeaderComponent, SpaceCardsComponent, SpaceTablesComponent],
  templateUrl: './dashboard-space.component.html',
  styleUrl: './dashboard-space.component.css'
})
export class DashboardSpaceComponent {

}
