import { Component } from '@angular/core';
import { ArtistsHeaderComponent } from "./artists-header/artists-header.component";
import { ArtistsCardsComponent } from "./artists-cards/artists-cards.component";
import { ArtistsTableComponent } from './artists-table/artists-table.component';

@Component({
  selector: 'app-dashboard-artists',
  imports: [ArtistsHeaderComponent, ArtistsCardsComponent, ArtistsTableComponent],
  templateUrl: './dashboard-artists.component.html',
  styleUrl: './dashboard-artists.component.css'
})
export class DashboardArtistsComponent {

}
