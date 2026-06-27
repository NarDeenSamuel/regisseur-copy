import {
  Component,
  inject
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

@Component({
  selector: 'app-location-verify',
  standalone: true,
  imports: [FormsModule],
  templateUrl:
    './location-verify.component.html',
  styleUrls:
  ['./location-verify.component.css']
})
export class LocationVerifyComponent {

  otp = '';

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
            '/'
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
