import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  LocationService
} from '../../services/location.service';
import { NavbarComponent } from "../../../../navbar/navbar.component";
import { SideBarComponent } from "../../../../side-bar/side-bar.component";

@Component({
  selector: 'app-location-verify',
  standalone: true,
  imports: [FormsModule, NavbarComponent, SideBarComponent],
  templateUrl:
    './location-verify.component.html',
  styleUrls:
  ['./location-verify.component.css']
})
export class LocationVerifyComponent implements OnInit{

  otp = '';
  ngOnInit(): void {

    if (!sessionStorage.getItem('locationVerifyReload')) {

      sessionStorage.setItem(
        'locationVerifyReload',
        'true'
      );

      window.location.reload();

    } else {

      sessionStorage.removeItem(
        'locationVerifyReload'
      );

    }

  }
  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  private locationService =
    inject(LocationService);

  verify(): void {

    const locationId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.locationService
      .verifyLocationEmail(
        locationId,
        this.otp
      )
      .subscribe({

        next: () => {

          alert(
            'Location Verified Successfully'
          );

          this.router.navigate([
            '/spaces'
          ]);

        },

        error: () => {

          alert(
            'Invalid OTP'
          );

        }

      });

  }

}
