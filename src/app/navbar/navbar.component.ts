import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit  {
user: any;
ngOnInit(): void {

  this.user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

}

closeMenu() {
  const offcanvasEl = document.getElementById('mobileMenu');

  if (offcanvasEl) {
    const offcanvas =
      bootstrap.Offcanvas.getInstance(offcanvasEl) ||
      new bootstrap.Offcanvas(offcanvasEl);

    offcanvas.hide();
  }
}

}
