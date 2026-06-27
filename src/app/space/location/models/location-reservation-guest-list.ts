export interface ReservationGuest {
  id: number;
  ticketId: number;
  visitorId: number;
  guestName: string;
  email: string;
  phoneNumber: string;
  tierName: string;
  qrCode: string;
  isCheckedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}