import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  LocationService
} from '../../services/location.service';
import {
  createIcons,
  icons
} from 'lucide';

import {
  AfterViewChecked
} from '@angular/core';
@Component({

  selector:
    'app-location-details',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './location-details.component.html',

  styleUrl:
    './location-details.component.css'

})
export class LocationDetailsComponent
implements OnInit, AfterViewChecked {

  /* =========================
     DEPENDENCY INJECTION
  ========================== */

  private route =
    inject(ActivatedRoute);

  private locationService =
    inject(LocationService);

  /* =========================
     STATE
  ========================== */

  location: any = null;

  loading = false;

  error = false;

  /* =========================
     LIFECYCLE
  ========================== */

  ngOnInit(): void {

    this.getLocationDetails();

  }
ngAfterViewChecked(): void {

  if (
    typeof document !== 'undefined'
  ) {

    createIcons({
      icons
    });

  }

}
  /* =========================
     GET DETAILS
  ========================== */

  getLocationDetails(): void {

    this.loading = true;

    this.error = false;

    const id = Number(

      this.route
        .snapshot
        .paramMap
        .get('id')

    );

    if (!id) {

      this.loading = false;

      this.error = true;

      return;

    }

    this.locationService
      .getLocationById(id)
      .subscribe({

       next: (response) => {

  response.sections?.forEach((section: any) => {

    section.availabilities?.forEach((availability: any) => {

      availability.calendarDays =
        this.generateCalendar(
          availability.startDate,
          availability.endDate
        );

    });

  });

  this.location = response;

  this.loading = false;

},

        error: (error) => {

          console.error(error);

          this.loading =
            false;

          this.error =
            true;

        }

      });

  }
closeLocation(): void {

  this.locationService
    .closeLocation(this.location.id)
    .subscribe({

      next: () => {

        this.location.locationStatus =
          'Closed';

      },

      error: (error) => {

        console.error(error);

      }

    });

}
activateLocation(): void {

  this.locationService
    .activateLocation(this.location.id)
    .subscribe({

      next: () => {

        this.location.locationStatus =
          'Active';

      },

      error: (error) => {

        console.error(error);

      }

    });

}
publishLocation(): void {

  this.locationService
    .publishLocation(this.location.id)
    .subscribe({

      next: () => {

        this.location.locationStatus =
          'Active';

      },

      error: (error) => {

        console.error(error);

      }

    });

}
formatTime(time: string): string {

  const [hours, minutes] = time
    .split(':')
    .map(Number);

  const suffix =
    hours >= 12
      ? 'PM'
      : 'AM';

  const formattedHour =

    hours % 12 || 12;

  return `${formattedHour}:${minutes
    .toString()
    .padStart(2, '0')} ${suffix}`;

}
generateCalendar(
  startDate: string,
  endDate: string
): number[] {

  const start = new Date(startDate);

  const end = new Date(endDate);

  const days: number[] = [];

  const current = new Date(start);

  while (current <= end) {

    days.push(
      current.getDate()
    );

    current.setDate(
      current.getDate() + 1
    );

  }

  return days;

}
submitDraft(): void {

  this.locationService
    .submitLocation(this.location.id)
    .subscribe({

      next: () => {

        this.location.locationStatus =
          'Inactive';

        alert(
          'Draft submitted successfully.'
        );

      },

      error: (error) => {

        console.error(error);

      }

    });

}
}
