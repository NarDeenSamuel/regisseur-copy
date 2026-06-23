import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-event-guests',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-guests.component.html',
  styleUrl: './event-guests.component.css'
})
export class EventGuestsComponent implements OnInit{
ngOnInit() {
  this.updatePagination();
}
buyersData = [

{
  buyerName:'James Carter',
  avatar:'assets/images/user1.jpg',
  orderId:'ORD-1001',
  email:'james.carter@email.com',
  phone:'(212) 555-0182',

  totalGuests:2,
  guestBreakdown:'1 Adult, 1 Adult',

  ticketType:'VIP',
  ticketQty:'2 × VIP',

  guestGroup:'Emily Thompson, Noah Carter',

  rsvpStatus:'Confirmed',
  rsvpCount:'2 / 2',

  paymentStatus:'Paid',
  paymentAmount:'$600.00',

  checkedIn:'2 of 2',
  accessZone:'VIP Lounge',
  accessArea:'Zone A'
},

{
  buyerName:'Michael Wong',
  avatar:'assets/images/user2.jpg',
  orderId:'ORD-1002',
  email:'michael.wong@email.com',
  phone:'(917) 555-0321',

  totalGuests:3,
  guestBreakdown:'2 Adults, 1 Child',

  ticketType:'GA',
  ticketQty:'3 × GA',

  guestGroup:'Michael Wong, Olivia Wong, Ethan Wong',

  rsvpStatus:'Confirmed',
  rsvpCount:'3 / 3',

  paymentStatus:'Paid',
  paymentAmount:'$450.00',

  checkedIn:'2 of 3',
  accessZone:'General Admission',
  accessArea:'Main Floor'
},

{
  buyerName:'Sarah Johnson',
  avatar:'assets/images/user3.jpg',
  orderId:'ORD-1003',
  email:'sarah@email.com',
  phone:'(646) 555-0274',

  totalGuests:1,
  guestBreakdown:'1 Adult',

  ticketType:'GA',
  ticketQty:'1 × GA',

  guestGroup:'Luna Patel',

  rsvpStatus:'Confirmed',
  rsvpCount:'1 / 1',

  paymentStatus:'Complimentary',
  paymentAmount:'$0.00',

  checkedIn:'1 of 1',
  accessZone:'Main Floor',
  accessArea:'Main Floor'
},

{
  buyerName:'Aisha Nguyen',
  avatar:'assets/images/user4.jpg',
  orderId:'ORD-1004',
  email:'aisha.nguyen@email.com',
  phone:'(201) 555-0147',

  totalGuests:2,
  guestBreakdown:'2 Adults',

  ticketType:'Backstage',
  ticketQty:'2 × Backstage',

  guestGroup:'Luna Patel, Aisha Nguyen',

  rsvpStatus:'Pending',
  rsvpCount:'1 / 2',

  paymentStatus:'Paid',
  paymentAmount:'$800.00',

  checkedIn:'0 of 2',
  accessZone:'Backstage',
  accessArea:'Zone B'
},

{
  buyerName:'Emma Thompson',
  avatar:'assets/images/user5.jpg',
  orderId:'ORD-1005',
  email:'emma@email.com',
  phone:'(212) 555-0199',

  totalGuests:4,
  guestBreakdown:'4 Adults',

  ticketType:'VIP',
  ticketQty:'4 × VIP',

  guestGroup:'Ethan Lee, Sophia Kim, Emma Thompson, Noah Davis',

  rsvpStatus:'Confirmed',
  rsvpCount:'4 / 4',

  paymentStatus:'Paid',
  paymentAmount:'$1,200.00',

  checkedIn:'3 of 4',
  accessZone:'VIP Lounge',
  accessArea:'Zone A'
}

];


searchTerm = '';

selectedStatus = '';
selectedAccess = '';

filteredBuyers = [...this.buyersData];
paginatedBuyers:any[] = [];

currentPage = 1;
itemsPerPage = 5;
pages:number[] = [];

applyFilters() {

  this.filteredBuyers =
    this.buyersData.filter(buyer => {

      const matchesSearch =

        !this.searchTerm ||

        buyer.buyerName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||

        buyer.orderId
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||

        buyer.email
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||

        buyer.phone
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      const matchesStatus =

        !this.selectedStatus ||

        buyer.rsvpStatus ===
        this.selectedStatus;

      const matchesAccess =

        !this.selectedAccess ||

        buyer.accessZone ===
        this.selectedAccess;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAccess
      );

    });

  this.currentPage = 1;

  this.updatePagination();
}
updatePagination(){

  const start =
    (this.currentPage - 1) * this.itemsPerPage;

  const end =
    start + this.itemsPerPage;

  this.paginatedBuyers =
    this.filteredBuyers.slice(start,end);

  const totalPages =
    Math.ceil(
      this.filteredBuyers.length /
      this.itemsPerPage
    );

  this.pages =
    Array.from(
      {length: totalPages},
      (_,i) => i + 1
    );
}

changePage(page:number){

  this.currentPage = page;

  this.updatePagination();
}


addGuest(){
  console.log('Add Guest');
}

exportBuyers(){
  console.log('Export Buyers');
}

editBuyer(buyer:any){
  console.log('Edit Buyer', buyer);
}

deleteBuyer(buyer:any){
  console.log('Delete Buyer', buyer);
}











importGuestList() {
  console.log('Import Guest List');
  // Open Upload Modal
}

assignZoneAccess() {
  console.log('Assign Zone');
  // Open Access Modal
}

sendGuestUpdate() {
  console.log('Send Update');
  // Open Email/SMS Modal
}

exportGuests() {
  console.log('Export Guests');
  // Export CSV / Excel
}




// first section in right

get totalGuestsCount(): number {
  return this.buyersData.reduce(
    (sum, x) => sum + x.totalGuests,
    0
  );
}

get vipCount(): number {
  return this.buyersData
    .filter(x => x.ticketType === 'VIP')
    .reduce((sum, x) => sum + x.totalGuests, 0);
}

get gaCount(): number {
  return this.buyersData
    .filter(x => x.ticketType === 'GA')
    .reduce((sum, x) => sum + x.totalGuests, 0);
}

get backstageCount(): number {
  return this.buyersData
    .filter(x => x.ticketType === 'Backstage')
    .reduce((sum, x) => sum + x.totalGuests, 0);
}

get vipPercent(): number {
  return (this.vipCount / this.totalGuestsCount) * 100;
}

get gaPercent(): number {
  return (this.gaCount / this.totalGuestsCount) * 100;
}

get backstagePercent(): number {
  return (this.backstageCount / this.totalGuestsCount) * 100;
}




// section two in right
activityList = [

  {
    title: 'Emily Thompson checked in',
    createdAt: '2026-06-23T10:24:00'
  },

  {
    title: 'Olivia Brown added onsite',
    createdAt: '2026-06-23T10:15:00'
  },

  {
    title: 'Noah Davis RSVP pending',
    createdAt: '2026-06-23T09:58:00'
  }
];
getActivityIcon(title: string): string {

  const text = title.toLowerCase();

  if (text.includes('checked in')) {
    return 'fa-circle-check';
  }

  if (
    text.includes('added') ||
    text.includes('created')
  ) {
    return 'fa-circle-plus';
  }

  if (
    text.includes('pending')
  ) {
    return 'fa-envelope';
  }

  if (
    text.includes('backstage') ||
    text.includes('access')
  ) {
    return 'fa-key';
  }

  if (
    text.includes('declined')
  ) {
    return 'fa-circle-xmark';
  }

  if (
    text.includes('vip')
  ) {
    return 'fa-star';
  }

  if (
    text.includes('transferred')
  ) {
    return 'fa-right-left';
  }

  return 'fa-clock';
}
getActivityColor(title: string): string {

  const text = title.toLowerCase();

  if (text.includes('checked in')) {
    return '#39ff14';
  }

  if (
    text.includes('added') ||
    text.includes('created')
  ) {
    return '#1da1ff';
  }

  if (
    text.includes('pending')
  ) {
    return '#ff9800';
  }

  if (
    text.includes('backstage') ||
    text.includes('access')
  ) {
    return '#b84cff';
  }

  if (
    text.includes('declined')
  ) {
    return '#ff0000';
  }

  if (
    text.includes('vip')
  ) {
    return '#ffd700';
  }

  if (
    text.includes('transferred')
  ) {
    return '#00d4ff';
  }

  return '#9ca3af';
}
formatTime(date: string): string {

  return new Date(date)
    .toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit'
      }
    );
}


// third section in right


get totalZoneGuests(): number {
  return this.buyersData.reduce(
    (sum, x) => sum + x.totalGuests,
    0
  );
}
get zoneDistribution() {

  const zones: any = {};

  this.buyersData.forEach(buyer => {

    if (!zones[buyer.accessZone]) {

      zones[buyer.accessZone] = 0;

    }

    zones[buyer.accessZone] += buyer.totalGuests;

  });

  const colors = [
    '#2fa7ff',
    '#b037ff',
    '#ffb300',
    '#17d4d4',
    '#c7c7c7',
    '#47d45a'
  ];

  return Object.keys(zones).map(
    (zone, index) => ({

      name: zone,

      count: zones[zone],

      percent:
        (zones[zone] / this.totalZoneGuests) * 100,

      color:
        colors[index % colors.length]

    })
  );

}


}
