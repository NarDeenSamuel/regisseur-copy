export interface LocationReservation {

  id: number;

  eventId: number;

  eventName: string;

  locationId: number;

  requestedByName: string;

  requestedByRole: string;

  bookingType: string;

  locationSectionId?: number;

  sectionName: string;

  startDateTime: string;

  endDateTime: string;

  status: string;
}