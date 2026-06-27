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
  LocationReservation
} from '../../models/location-reservation.model';

@Component({
  selector: 'app-location-reservation-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-reservation-approvals.component.html',
  styleUrl: './location-reservation-approvals.component.scss'
})
export class LocationReservationApprovalsComponent
  implements OnInit {

  private locationService =
    inject(LocationService);

  reservations: LocationReservation[] = [];

  ngOnInit(): void {

    this.loadReservations();

  }

  loadReservations(): void {

    this.locationService
      .getReservations()
      .subscribe((data: any) => {

        this.reservations = data;

      });

  }

  approve(id: number): void {

    this.locationService
      .approveReservation(id)
      .subscribe(() => {

        this.loadReservations();

      });

  }

  reject(id: number): void {

    this.locationService
      .rejectReservation(id)
      .subscribe(() => {

        this.loadReservations();

      });

  }
}