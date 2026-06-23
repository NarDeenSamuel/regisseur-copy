import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-event-overview',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.css'
})
export class EventOverviewComponent {

recentOrders = [
  {
    orderNo: 'OR-10032',
    buyer: 'James Carter',
    avatar: 'assets/images/user1.jpg',
    ticketType: 'VIP',
    qty: 2,
    total: '$120.00',
    payment: 'Paid',
    refund: '-'
  },
  {
    orderNo: 'OR-10092',
    buyer: 'Michael Wong',
    avatar: 'assets/images/user2.jpg',
    ticketType: 'General Admission',
    qty: 3,
    total: '$297.00',
    payment: 'Paid',
    refund: '-'
  }
];

crewSnapshot = [
  {
    role: 'Event Manager',
    assigned: 3,
    required: 3,
    status: 'Assigned',
    lead: 'Jordan Lee',
    avatar: 'assets/images/user1.jpg'
  },
  {
    role: 'Security',
    assigned: 18,
    required: 22,
    status: 'Assigned',
    lead: 'Chris Davis',
    avatar: 'assets/images/user2.jpg'
  }
];

currentOrdersPage = 1;
currentCrewPage = 1;

selectedModalTitle = '';
selectedModalData: any[] = [];
openOrdersModal() {

  this.selectedModalTitle =
    'All Purchase Orders';

  this.selectedModalData =
    [...this.recentOrders];

}

openCrewModal() {

  this.selectedModalTitle =
    'Full Crew';

  this.selectedModalData =
    [...this.crewSnapshot];

}
ordersPage = 1;
crewPage = 1;

prevOrdersPage() {

  if (this.ordersPage > 1) {

    this.ordersPage--;

  }

}

nextOrdersPage() {

  this.ordersPage++;

}

prevCrewPage() {

  if (this.crewPage > 1) {

    this.crewPage--;

  }

}

nextCrewPage() {

  this.crewPage++;

}

programSchedule = [
  {
    time: '4:00 PM',
    item: 'Doors Open',
    performer: 'Event Operations',
    avatar: '',
    stage: 'Main Entrance',
    status: 'Scheduled'
  },
  {
    time: '4:30 PM',
    item: 'Opening DJ',
    performer: 'DJ Nova',
    avatar: 'assets/images/user1.jpg',
    stage: 'Main Stage',
    status: 'Scheduled'
  },
  {
    time: '5:00 PM',
    item: 'Host Welcome',
    performer: 'Event Host',
    avatar: 'assets/images/user2.jpg',
    stage: 'Main Stage',
    status: 'Scheduled'
  },
  {
    time: '6:00 PM',
    item: 'Main Performance',
    performer: 'The Midnight Echo',
    avatar: 'assets/images/user3.jpg',
    stage: 'Main Stage',
    status: 'Live Now'
  },
  {
    time: '7:30 PM',
    item: 'Guest Performance',
    performer: 'Luna Waves',
    avatar: 'assets/images/user4.jpg',
    stage: 'Main Stage',
    status: 'Confirmed'
  },
  {
    time: '9:00 PM',
    item: 'Closing Set',
    performer: 'DJ Nova',
    avatar: 'assets/images/user1.jpg',
    stage: 'Main Stage',
    status: 'Scheduled'
  }
];


eventTimeline = [
  { label: 'Load-In', time: '8:00 AM', active: false },
  { label: 'Crew Call', time: '9:00 AM', active: false },
  { label: 'Sound Check', time: '10:00 AM', active: false },
  { label: 'Doors Open', time: '4:00 PM', active: true },
  { label: 'Event Start', time: '6:00 PM', active: true },
  { label: 'Last Entry', time: '9:30 PM', active: true },
  { label: 'Event End', time: '11:00 PM', active: false },
  { label: 'Load-Out', time: '11:30 PM', active: false }
];

checkedInGuests = [
  {
    icon: 'fa-solid fa-ticket',
    iconClass: 'green',
    name: 'New order received',
    details: 'Order #OR-10094 • 2 x VIP',
    time: '10:24 AM'
  },
  {
    icon: 'fa-solid fa-user-check',
    iconClass: 'blue',
    name: 'Guest checked in',
    details: 'Order #OR-10012 • 2 x VIP',
    time: '10:12 AM'
  },
  {
    icon: 'fa-solid fa-rotate-left',
    iconClass: 'yellow',
    name: 'Refund requested',
    details: 'Order #OR-10006 • 2 x VIP',
    time: '9:45 AM'
  },
  {
    icon: 'fa-solid fa-envelope-open',
    iconClass: 'purple',
    name: 'RSVP accepted',
    details: 'John Thompson • 2 guests',
    time: '9:21 AM'
  },
  {
    icon: 'fa-solid fa-ticket',
    iconClass: 'green',
    name: 'New order received',
    details: 'Order #OR-10038 • 1 x Complimentary',
    time: '8:57 AM'
  }
];
ticketSales = [
  {
    type: 'General Admission',
    sold: 78,
    capacity: 400
  },
  {
    type: 'VIP',
    sold: 46,
    capacity: 150
  },
  {
    type: 'Early Bird',
    sold: 24,
    capacity: 200
  },
  {
    type: 'Complimentary / Guest List',
    sold: 8,
    capacity: 70
  }
];
alerts = [
  {
    title: 'Security is 2 staff below required',
    description: 'Need 2 more for full coverage'
  },
  {
    title: 'Hospitality shift starts in 30 min',
    description: 'Ensure all staff are checked in'
  },
  {
    title: 'Program item "Main Performance" is live',
    description: 'Next: Guest Performance at 7:30 PM'
  }
];
getAlertIcon(title: string): string {

  const text = title.toLowerCase();

  if (
    text.includes('security') ||
    text.includes('required') ||
    text.includes('missing')
  ) {

    return 'fa-solid fa-circle-exclamation';

  }

  if (
    text.includes('shift') ||
    text.includes('warning') ||
    text.includes('starts')
  ) {

    return 'fa-solid fa-triangle-exclamation';

  }

  if (
    text.includes('live') ||
    text.includes('program')
  ) {

    return 'fa-solid fa-circle-info';

  }

  return 'fa-solid fa-bell';
}
getAlertClass(title: string): string {

  const text = title.toLowerCase();

  if (
    text.includes('security') ||
    text.includes('required') ||
    text.includes('missing')
  ) {

    return 'danger';

  }

  if (
    text.includes('shift') ||
    text.includes('warning') ||
    text.includes('starts')
  ) {

    return 'warning';

  }

  if (
    text.includes('live') ||
    text.includes('program')
  ) {

    return 'info';

  }

  return 'default-alert';
}
addGuest() {
  console.log('Add Guest');
}

createOrder() {
  console.log('Create Order');
}

processRefund() {
  console.log('Process Refund');
}

manageCrew() {
  console.log('Manage Crew');
}

editProgram() {
  console.log('Edit Program');
}

exportReport() {
  console.log('Export Report');
}

}
