import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  // private baseUrl = 'https://localhost:7041/api';
  private baseUrl =
    'https://regussierservices.runasp.net/api';
  constructor(
    private http: HttpClient
  ) {}

  createTalentService(
    data: any
  ) {

    return this.http.post(
      `${this.baseUrl}/talent-services`,
      data
    );

  }


getTalentServices(userId: number) {
  return this.http.get<any[]>(
    `${this.baseUrl}/talent-services/user/${userId}`
  );
}
createTalentProduct(data: any) {

  return this.http.post(
    `${this.baseUrl}/talent-products`,
    data
  );

}

getTalentProducts(userId: number) {

  return this.http.get<any[]>(
    `${this.baseUrl}/talent-products/user/${userId}`
  );

}
createTalentRental(data: any) {

  return this.http.post(
    `${this.baseUrl}/talent-rentals`,
    data
  );

}

getTalentRentals(userId: number) {

  return this.http.get<any[]>(
    `${this.baseUrl}/talent-rentals/user/${userId}`
  );

}



}
