import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
 constructor(private router: Router) {}

  setTab(tab: 'signin' | 'signup') {

    if (tab === 'signin') {
      this.router.navigate(['/registration/signin']);
    } else {
      this.router.navigate(['/registration/signup']);
    }

  }


}
