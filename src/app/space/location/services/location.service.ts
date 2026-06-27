import {
  Injectable,
  inject
} from '@angular/core';
import { AmenityCategory } from '../models/amenity-category';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  LocationModel
} from '../models/location-model';

import {
  LocationCategory
} from '../models/location-category.model';
import { ReservationGuest } from '../models/location-reservation-guest-list';
import { GuestStatistics } from '../models/location-stats-guest-list';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private http =
    inject(HttpClient);

  private baseUrl =
    'http://localhost:5180/api';

  // =========================
  // LOCATIONS
  // =========================

  createLocation(
    data: LocationModel
  ): Observable<number> {

    return this.http.post<number>(

      `${this.baseUrl}/locations`,
      data

    );

  }

  getLocations(
    page: number,
    pageSize: number
  ) {

    return this.http.get(

      `${this.baseUrl}/locations?page=${page}&pageSize=${pageSize}`

    );

  }

  getLocationById(
    id: number
  ) {

    return this.http.get<LocationModel>(

      `${this.baseUrl}/locations/${id}`

    );

  }

  searchLocations(
    keyword: string,
    status: string,
    page: number,
    pageSize: number
  ) {

    return this.http.get(

`${this.baseUrl}/locations/search?keyword=${keyword}&status=${status}&page=${page}&pageSize=${pageSize}`

    );

  }

  // =========================
  // VERIFY
  // =========================

  verifyLocationEmail(
    id: number,
    otp: string
  ) {

    return this.http.post(

      `${this.baseUrl}/locations/${id}/verify-email`,

      {
        otp
      }

    );

  }

  // =========================
  // APPROVALS
  // =========================

  getPendingLocations() {

    return this.http.get(

`${this.baseUrl}/locations/search?approvalStatus=Pending&page=1&pageSize=100`

    );

  }

  approveLocation(
    id: number
  ) {

    return this.http.patch(

      `${this.baseUrl}/locations/${id}/approve`,

      {}

    );

  }

  rejectLocation(
    id: number,
    reason: string
  ) {

    return this.http.patch(

      `${this.baseUrl}/locations/${id}/reject`,

      {
        reason
      }

    );

  }

  // =========================
  // STATUS FLOW
  // =========================

  publishLocation(
    id: number
  ) {

    return this.http.patch(

      `${this.baseUrl}/locations/${id}/publish`,

      {}

    );

  }

  closeLocation(
    id: number
  ) {

    return this.http.patch(

      `${this.baseUrl}/locations/${id}/close`,

      {}

    );

  }

  activateLocation(
    id: number
  ) {

    return this.http.patch(

      `${this.baseUrl}/locations/${id}/activate`,

      {}

    );

  }

  // =========================
  // UPDATE
  // =========================

  updateLocation(
    id: number,
    data: any
  ) {

    return this.http.put(

      `${this.baseUrl}/locations/${id}`,
      data

    );

  }
// =========================
// SUBMIT DRAFT
// =========================

submitLocation(
  id: number
) {

  return this.http.patch(

    `${this.baseUrl}/locations/${id}/submit`,

    {}

  );

}
  // =========================
  // CATEGORIES
  // =========================

  getCategories():
    Observable<LocationCategory[]> {

    return this.http.get<LocationCategory[]>(

      `${this.baseUrl}/location-categories`

    );

  }

  createCategory(data: {
    name: string;
    parentCategoryId: number | null;
  }) {

    return this.http.post(

      `${this.baseUrl}/location-categories`,
      data

    );

  }
// =========================
// AMENITIES
// =========================

getAmenities():
  Observable<AmenityCategory[]> {

  return this.http.get<AmenityCategory[]>(

    `${this.baseUrl}/amenities`

  );

}

createAmenityCategory(data: {
  name: string;
}) {

  return this.http.post(

    `${this.baseUrl}/amenities/categories`,
    data

  );

}

createAmenity(data: {
  name: string;
  amenityCategoryId: number;
}) {

  return this.http.post(

    `${this.baseUrl}/amenities`,
    data

  );

}
// =========================
// RESERVATIONS
// =========================

getReservations(status?: string) {

  let url =
    `${this.baseUrl}/locations/reservations`;

  if (status) {
    url += `?status=${status}`;
  }

  return this.http.get(url);
}

approveReservation(id: number) {

  return this.http.patch(

    `${this.baseUrl}/locations/reservations/${id}/approve`,

    {}

  );
}

rejectReservation(id: number) {

  return this.http.patch(

    `${this.baseUrl}/locations/reservations/${id}/reject`,

    {}

  );
}
// =========================
// GUEST LIST
// =========================

getGuestList(eventId: number) {
  return this.http.get<ReservationGuest[]>(
    `${this.baseUrl}/reservation-guests/event/${eventId}`
  );
}
getGuestStatistics(
  eventId: number
): Observable<GuestStatistics> {

  return this.http.get<GuestStatistics>(

    `${this.baseUrl}/reservation-guests/event/${eventId}/statistics`

  );

}
checkInByQr(qrCode: string) {

  return this.http.post(

    `${this.baseUrl}/reservation-guests/check-in-by-qr`,

    JSON.stringify(qrCode),

    {
      headers: {
        'Content-Type': 'application/json'
      }
    }

  );
}
checkInByTicket(ticketId: number) {

  return this.http.post(

    `${this.baseUrl}/reservation-guests/check-in-by-ticket`,

    ticketId

  );
}
}