import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-single-event',
  imports: [NavbarComponent,SideBarComponent,RouterOutlet,RouterLink],
  templateUrl: './single-event.component.html',
  styleUrl: './single-event.component.css'
})
export class SingleEventComponent {

}
