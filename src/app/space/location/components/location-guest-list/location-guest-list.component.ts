import { Component } from '@angular/core';
import { ReservationGuest } from '../../models/location-reservation-guest-list';
import { GuestStatistics } from '../../models/location-stats-guest-list';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-location-guest-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
     ZXingScannerModule
  ],
  templateUrl: './location-guest-list.component.html',
  styleUrl: './location-guest-list.component.scss'
})
export class LocationGuestListComponent {
 constructor(
    private locationService: LocationService
  ) {}

  eventId!: number;

  guests: ReservationGuest[] = [];

  statistics?: GuestStatistics;

  search() {

    if (!this.eventId) {
      return;
    }

    this.locationService
      .getGuestList(this.eventId)
      .subscribe({
        next: (res) => {
          this.guests = res;
        }
      });

    this.locationService
      .getGuestStatistics(this.eventId)
      .subscribe({
        next: (res) => {
          this.statistics = res;
        }
      });
  }
  scannerEnabled = false;

onQrScan(result: string) {

  console.log('QR RESULT =>', result);

  alert(`Scanned QR: ${result}`);

  // اقفل الكاميرا بعد أول Scan
  this.scannerEnabled = false;

}
checkInGuest(ticketId: number) {

  this.locationService
    .checkInByTicket(ticketId)
    .subscribe({

      next: (res: any) => {

        const guest = this.guests.find(
          x => x.ticketId === ticketId
        );

        if (guest) {
          guest.isCheckedIn = true;
        }

        alert(
          `${res.guestName} checked in successfully`
        );

      },

      error: err => {

        alert(err.error);

      }

    });
}
}