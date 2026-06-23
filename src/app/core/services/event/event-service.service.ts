import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // private baseUrl =
  //   'https://localhost:7163/api';

    private baseUrl =
    'http://eventservice.runasp.net/api';
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



getMyCreatedEvents(userId: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.baseUrl}/Events/my-created-events/${userId}`
  );
}
}
