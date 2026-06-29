import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private baseUrl = 'https://spacemodule.runasp.net/api';

  constructor(
    private http: HttpClient
  ) {}

  getLocationsByOwner(ownerId: number): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.baseUrl}/locations/owner/${ownerId}`
    );
}


getAllLocations(page = 1, pageSize = 20) {
  return this.http.get<any>(
    `${this.baseUrl}/locations?page=${page}&pageSize=${pageSize}`
  );
}

submitLocation(id: number) {

  return this.http.patch(

    `${this.baseUrl}/locations/${id}/approve`,

    {}

  );

}

rejectLocation(id: number) {

  return this.http.patch(

    `${this.baseUrl}/locations/${id}/reject`,

    {}

  );

}









}
