import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewHeaderComponent } from "./overview-header/overview-header.component";
import { OverviewCardsComponent } from "./overview-cards/overview-cards.component";
import { OverviewTablesComponent } from "./overview-tables/overview-tables.component";

@Component({
  selector: 'app-dashboard-overview',
  imports: [ CommonModule, OverviewHeaderComponent, OverviewCardsComponent, OverviewTablesComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css'
})
export class DashboardOverviewComponent {

}
