import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-not-found',
  imports: [NavbarComponent, SideBarComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
