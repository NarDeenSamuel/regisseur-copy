import { Component } from '@angular/core';
import { VendorsHeaderComponent } from './vendors-header/vendors-header.component';
import { VendorsCardsComponent } from "./vendors-cards/vendors-cards.component";
import { VendorsTableComponent } from "./vendors-table/vendors-table.component";

@Component({
  selector: 'app-dashboard-vendors',
  imports: [VendorsHeaderComponent, VendorsCardsComponent, VendorsTableComponent],
  templateUrl: './dashboard-vendors.component.html',
  styleUrl: './dashboard-vendors.component.css'
})
export class DashboardVendorsComponent {

}
