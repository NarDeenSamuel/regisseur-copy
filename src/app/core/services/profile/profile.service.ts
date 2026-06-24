import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // private baseUrl = 'https://localhost:7041/api';
private baseUrl =
    'https://regussierservices.runasp.net/api';
  constructor(private http: HttpClient) {}

 completeExplorerProfile(data: any) {

  return this.http.post(
    `${this.baseUrl}/explorers/complete-profile`,
    data
  );

}
  getCurrentUser() {

  return JSON.parse(
    localStorage.getItem('user') || '{}'
  );

}
completeArtistProfile(
  category: string,
  data: any
) {

  let endpoint = '';

  switch (category) {

    case 'Performer':
      endpoint = 'performers';
      break;

    case 'Host':
      endpoint = 'hosts';
      break;

    case 'Security':
      endpoint = 'security';
      break;

    case 'Promoters':
      endpoint = 'promoters';
      break;

    default:
      endpoint = 'performers';

  }

  return this.http.post(
    `${this.baseUrl}/${endpoint}/complete-profile`,
    data
  );

}



completeProducerProfile(data: any) {

  return this.http.post(
    `${this.baseUrl}/Producers/complete-profile`,
    data
  );

}

completeOrganizerProfile(data: any) {

  return this.http.post(
    `${this.baseUrl}/Organizers/complete-profile`,
    data
  );



}
completeProfile(
  role: string,
  data: any
) {

  const endpoint =
    role === 'Organizer'
      ? 'Organizers'
      : 'Producers';

  return this.http.post(
    `${this.baseUrl}/${endpoint}/complete-profile`,
    data
  );

}
completeVendorProfile(data: any) {

  return this.http.post(
    `${this.baseUrl}/vendors/complete-profile`,
    data
  );

}

completeServiceProviderProfile(
  data: any
) {

  return this.http.post(
    `${this.baseUrl}/serviceproviders/complete-profile`,
    data
  );

}

completeSpaceProfile(data: any) {

  return this.http.post(
    `${this.baseUrl}/SpaceProfiles/complete-profile`,
    data
  );

}

}
