import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  LocationService
} from '../../services/location.service';

import {
  LocationModel
} from '../../models/location-model';

@Component({

  selector:
    'app-location-listing',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl:
    './location-listing.component.html',

  styleUrl:
    './location-listing.component.css'

})
export class LocationListingComponent
implements OnInit {

  /* =========================
     INJECTION
  ========================== */

  private locationService =
    inject(LocationService);

  /* =========================
     STATE
  ========================== */

  locations: LocationModel[] = [];

  currentPage = 1;

  pageSize = 8;

  totalCount = 0;

  totalPages = 0;

  searchText = '';

  selectedStatus = '';

  isLoading = false;

  /* =========================
     LIFECYCLE
  ========================== */

  ngOnInit(): void {

    this.getLocations();

  }

  /* =========================
     SEARCH
  ========================== */

  search(): void {

    this.isLoading = true;

    this.locationService
      .searchLocations(

        this.searchText,

        this.selectedStatus,

        this.currentPage,

        this.pageSize

      )
      .subscribe({

        next: (response: any) => {

          this.locations =
            response.items ?? [];

          this.totalCount =
            response.totalCount ?? 0;

          this.totalPages =
            Math.ceil(
              this.totalCount /
              this.pageSize
            );

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  /* =========================
     GET LOCATIONS
  ========================== */

  getLocations(): void {

    this.isLoading = true;

    this.locationService
      .getLocations(
        this.currentPage,
        this.pageSize
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'LOCATIONS:',
            response
          );

          this.locations =
            response.items ?? [];

          this.totalCount =
            response.totalCount ?? 0;

          this.totalPages =
            Math.ceil(
              this.totalCount /
              this.pageSize
            );

          this.isLoading = false;

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

  }

  /* =========================
     PAGINATION
  ========================== */

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

      this.searchText ||
      this.selectedStatus

        ? this.search()

        : this.getLocations();

    }

  }

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

      this.searchText ||
      this.selectedStatus

        ? this.search()

        : this.getLocations();

    }

  }

  /* =========================
     HELPERS
  ========================== */

  isPublished(
    location: LocationModel
  ): boolean {

    return (
      location.locationStatus ===
      'Active'
    );

  }

  isClosed(
    location: LocationModel
  ): boolean {

    return (
      location.locationStatus ===
      'Closed'
    );

  }

  isVerified(
    location: LocationModel
  ): boolean {

    return (
      location.emailVerified === true
    );

  }

  isApproved(
    location: LocationModel
  ): boolean {

    return (
      location.approvalStatus ===
      'Approved'
    );

  }

}
