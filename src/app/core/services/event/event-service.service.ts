import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // private baseUrl ='https://localhost:7163/api';

    private baseUrl ='https://eventmodule.runasp.net/api';
  constructor(
    private http: HttpClient
  ) {}
getProducers() {
  return this.http.get<any[]>(
    `${this.baseUrl}/Producers`
  );
}
getOrganizers() {
  return this.http.get<any[]>(
    `${this.baseUrl}/Organizers`
  );
}

 createEvent(data: any) {
  return this.http.post(
    `${this.baseUrl}/Events`,
    data
  );
}

getEvents(page = 1, pageSize = 20) {

  return this.http.get<any>(
    `${this.baseUrl}/Events?page=${page}&pageSize=${pageSize}`
  );

}

getMyCreatedEvents(userId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.baseUrl}/Events/my-created-events/${userId}`
  );
}
addToFavorite(
  eventId: number,
  userId: number
) {
  return this.http.post(
    `${this.baseUrl}/Events/${eventId}/favorite?userId=${userId}`,
    {}
  );
}

removeFromFavorite(
  eventId: number,
  userId: number
) {
  return this.http.delete(
    `${this.baseUrl}/Events/${eventId}/favorite?userId=${userId}`
  );
}
getFavorites(userId: number) {

  return this.http
    .get<any[]>(
      `${this.baseUrl}/Events/favorites/${userId}`
    )
    .pipe(

      map(events =>
        events.map(event => ({
          ...event,
          favorite: true
        }))
      )

    );

}
addToWishlist(
  eventId: number,
  userId: number
) {

  return this.http.post(
    `${this.baseUrl}/Events/${eventId}/wishlist?userId=${userId}`,
    {}
  );

}
getWishlist(userId: number) {

  return this.http
    .get<any[]>(
      `${this.baseUrl}/Events/wishlist/${userId}`
    )
    .pipe(

      map(events =>
        events.map(event => ({
          ...event,
          saved: true
        }))
      )

    );

}
removeFromWishlist(
  eventId: number,
  userId: number
) {

  return this.http.delete(
    `${this.baseUrl}/Events/${eventId}/wishlist?userId=${userId}`
  );

}


getLocations() {
  return this.http.get<any[]>(
    `${this.baseUrl}/Locations`
  );
}
}
