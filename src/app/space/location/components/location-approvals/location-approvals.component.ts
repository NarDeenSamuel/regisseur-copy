import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  LocationService
} from '../../services/location.service';

import {
  LocationModel
} from '../../models/location-model';

@Component({
  selector: 'app-location-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl:
    './location-approvals.component.html',

  styleUrl:
    './location-approvals.component.css'
})
export class LocationApprovalsComponent
implements OnInit {

  private locationService =
    inject(LocationService);

  locations: LocationModel[] = [];
toastMessage = '';

toastType:
  'success' |
  'error' = 'success';

showToast = false;
  isLoading = false;

  ngOnInit(): void {

    this.loadPendingLocations();

  }
showToastMessage(
  message: string,
  type: 'success' | 'error'
): void {

  this.toastMessage = message;

  this.toastType = type;

  this.showToast = true;

  setTimeout(() => {

    this.showToast = false;

  }, 4000);

}
  loadPendingLocations(): void {

    this.isLoading = true;

    this.locationService
      .getPendingLocations()
      .subscribe({

       next: (response: any) => {

  console.log(response);

  this.locations =
    response.items ?? response;

  this.isLoading = false;

},

        error: () => {

          this.isLoading = false;

          alert(
            'Failed To Load Locations'
          );

        }

      });

  }

  approveLocation(id: number): void {

    this.locationService
      .approveLocation(id)
      .subscribe({

        next: () => {

          this.showToastMessage(
  'Location approved successfully.',
  'success'
);

          this.loadPendingLocations();

        },

        error: () => {

          this.showToastMessage(
  'Location must be verified before approval.',
  'error'
);

        }

      });

  }

  rejectLocation(id: number): void {

    const reason =
      prompt(
        'Enter Reject Reason'
      );

    if (!reason) return;

    this.locationService
      .rejectLocation(id, reason)
      .subscribe({

        next: () => {

          this.showToastMessage(
  'Location rejected successfully.',
  'success'
);

          this.loadPendingLocations();

        },

        error: () => {

          this.showToastMessage(
  'Failed to reject location.',
  'error'
);

        }

      });

  }

}
