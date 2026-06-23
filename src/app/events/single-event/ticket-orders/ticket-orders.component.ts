import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-orders.component.html',
  styleUrls: ['./ticket-orders.component.css']
})
export class TicketOrdersComponent {

recentOrders = [

{
  id:'ORD-10032',
  buyer:'James Carter',
  avatar:'assets/images/user1.jpg',
  guests:2,
  ticketType:'VIP',
  qty:2,
  total:'$120.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 10, 2025',
  purchaseTime:'10:24 AM',
  checkIn:'Checked In'
},

{
  id:'ORD-10029',
  buyer:'Michael Wong',
  avatar:'assets/images/user2.jpg',
  guests:3,
  ticketType:'General Admission',
  qty:3,
  total:'$297.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 10, 2025',
  purchaseTime:'9:58 AM',
  checkIn:'Partial Check-In'
},

{
  id:'ORD-10031',
  buyer:'David Rodriguez',
  avatar:'assets/images/user3.jpg',
  guests:2,
  ticketType:'Early Bird',
  qty:2,
  total:'$220.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 9, 2025',
  purchaseTime:'8:41 PM',
  checkIn:'Not Checked In'
},

{
  id:'ORD-10025',
  buyer:'Sarah Johnson',
  avatar:'assets/images/user4.jpg',
  guests:2,
  ticketType:'VIP',
  qty:2,
  total:'$950.00',
  paymentStatus:'Refunded',
  refundStatus:'Refunded',
  purchaseDate:'May 9, 2025',
  purchaseTime:'7:32 PM',
  checkIn:'Not Checked In'
},

{
  id:'ORD-10056',
  buyer:'Aisha Nguyen',
  avatar:'assets/images/user5.jpg',
  guests:1,
  ticketType:'General Admission',
  qty:1,
  total:'$190.00',
  paymentStatus:'Paid',
  refundStatus:'Partially Refunded',
  purchaseDate:'May 8, 2025',
  purchaseTime:'6:15 PM',
  checkIn:'Checked In'
},

{
  id:'ORD-10088',
  buyer:'Brian Lee',
  avatar:'assets/images/user6.jpg',
  guests:1,
  ticketType:'Complimentary',
  qty:1,
  total:'$0.00',
  paymentStatus:'Complimentary',
  refundStatus:'No Refund',
  purchaseDate:'May 8, 2025',
  purchaseTime:'4:48 PM',
  checkIn:'Checked In'
},

{
  id:'ORD-10091',
  buyer:'Emma Thompson',
  avatar:'assets/images/user7.jpg',
  guests:4,
  ticketType:'General Admission',
  qty:4,
  total:'$396.00',
  paymentStatus:'Pending',
  refundStatus:'No Refund',
  purchaseDate:'May 8, 2025',
  purchaseTime:'2:12 PM',
  checkIn:'Not Checked In'
},

{
  id:'ORD-10102',
  buyer:'Ethan Lee',
  avatar:'assets/images/user8.jpg',
  guests:2,
  ticketType:'VIP',
  qty:2,
  total:'$280.00',
  paymentStatus:'Failed',
  refundStatus:'No Refund',
  purchaseDate:'May 7, 2025',
  purchaseTime:'11:03 AM',
  checkIn:'Not Checked In'
},

{
  id:'ORD-10110',
  buyer:'Sophia Brown',
  avatar:'assets/images/user1.jpg',
  guests:3,
  ticketType:'VIP',
  qty:3,
  total:'$420.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 7, 2025',
  purchaseTime:'10:10 AM',
  checkIn:'Checked In'
},

{
  id:'ORD-10111',
  buyer:'Liam Wilson',
  avatar:'assets/images/user2.jpg',
  guests:1,
  ticketType:'Early Bird',
  qty:1,
  total:'$75.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 6, 2025',
  purchaseTime:'9:00 AM',
  checkIn:'Checked In'
},


{
  id:'ORD-10116',
  buyer:'Charlotte Anderson',
  avatar:'assets/images/user7.jpg',
  guests:3,
  ticketType:'VIP',
  qty:3,
  total:'$480.00',
  paymentStatus:'Refunded',
  refundStatus:'Refunded',
  purchaseDate:'May 4, 2025',
  purchaseTime:'1:40 PM',
  checkIn:'Not Checked In'
},

{
  id:'ORD-10117',
  buyer:'Benjamin Thomas',
  avatar:'assets/images/user8.jpg',
  guests:2,
  ticketType:'General Admission',
  qty:2,
  total:'$180.00',
  paymentStatus:'Paid',
  refundStatus:'No Refund',
  purchaseDate:'May 3, 2025',
  purchaseTime:'11:00 AM',
  checkIn:'Checked In'
}

];
allOrders = [...this.recentOrders];
filteredOrders = [...this.recentOrders];

searchTerm = '';

selectedPayment = '';
selectedRefund = '';
selectedTicketType = '';

currentPage = 1;
itemsPerPage = 8;
applyFilters() {

  this.filteredOrders = this.allOrders.filter(order => {

    const matchesSearch = !this.searchTerm ||

      order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      order.buyer.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchesPayment =
      !this.selectedPayment ||
      order.paymentStatus === this.selectedPayment;

    const matchesRefund =
      !this.selectedRefund ||
      order.refundStatus === this.selectedRefund;

    const matchesTicket =
      !this.selectedTicketType ||
      order.ticketType === this.selectedTicketType;

    return (
      matchesSearch &&
      matchesPayment &&
      matchesRefund &&
      matchesTicket
    );

  });

  this.currentPage = 1;

}
get paginatedOrders() {

  const start =
    (this.currentPage - 1) * this.itemsPerPage;

  return this.filteredOrders.slice(
    start,
    start + this.itemsPerPage
  );

}
get totalPages() {

  return Math.ceil(
    this.filteredOrders.length /
    this.itemsPerPage
  );

}
changePage(page:number){

  this.currentPage = page;

}
get pages(){

  return Array.from(
    {length:this.totalPages},
    (_,i)=>i+1
  );

}


editOrder(order: any) {

  console.log('Edit', order);

  // افتح مودال التعديل

}

deleteOrder(order: any) {

  const confirmDelete = confirm(
    `Delete Order ${order.id}?`
  );

  if (confirmDelete) {

    this.recentOrders =
      this.recentOrders.filter(
        x => x.id !== order.id
      );

    this.applyFilters();

  }

}
createOrder(): void {

  console.log({
    action: 'Create Order',
    eventId: 'EVT-001',
    timestamp: new Date()
  });

}

resendConfirmation(): void {

  console.log({
    action: 'Resend Confirmation',
    orderId: 'ORD-10032'
  });

}

processRefund(): void {

  console.log({
    action: 'Process Refund',
    orderId: 'ORD-10029',
    amount: 297
  });

}

transferTicket(): void {

  console.log({
    action: 'Transfer Ticket',
    ticketId: 'VIP-001'
  });

}

exportOrders(): void {

  console.log({
    action: 'Export Orders',
    format: 'Excel'
  });

}







// right section

get totalOrders(): number {
  return this.recentOrders.length;
}

get paidCount(): number {
  return this.recentOrders.filter(
    x => x.paymentStatus === 'Paid'
  ).length;
}

get pendingCount(): number {
  return this.recentOrders.filter(
    x => x.paymentStatus === 'Pending'
  ).length;
}

get refundedCount(): number {
  return this.recentOrders.filter(
    x => x.paymentStatus === 'Refunded'
  ).length;
}

get failedCount(): number {
  return this.recentOrders.filter(
    x => x.paymentStatus === 'Failed'
  ).length;
}

get complimentaryCount(): number {
  return this.recentOrders.filter(
    x => x.paymentStatus === 'Complimentary'
  ).length;
}
get paidPercent(): number {
  return (this.paidCount / this.totalOrders) * 100;
}

get pendingPercent(): number {
  return (this.pendingCount / this.totalOrders) * 100;
}

get refundedPercent(): number {
  return (this.refundedCount / this.totalOrders) * 100;
}

get failedPercent(): number {
  return (this.failedCount / this.totalOrders) * 100;
}

get complimentaryPercent(): number {
  return (this.complimentaryCount / this.totalOrders) * 100;
}







// natifications


recentActivities = [

{
  title:'Order ORD-10032 completed',
  subtitle:'James Carter • Paid $120.00',
  time:'10:24 AM'
},

{
  title:'Refund processed for ORD-10025',
  subtitle:'Sarah Johnson • $950.00',
  time:'7:32 PM'
},

{
  title:'Check-in completed for ORD-10032',
  subtitle:'James Carter • 2 tickets',
  time:'6:47 PM'
},

{
  title:'Complimentary order created',
  subtitle:'ORD-10088 • Brian Lee',
  time:'4:48 PM'
},

{
  title:'Payment pending for ORD-10091',
  subtitle:'Emma Thompson • $396.00',
  time:'2:12 PM'
}

];
getActivityIcon(title:string): string {

  const text = title.toLowerCase();

  if(text.includes('refund')){
    return 'fa-solid fa-arrow-rotate-left';
  }

  if(text.includes('check-in')){
    return 'fa-solid fa-circle-check';
  }

  if(text.includes('complimentary')){
    return 'fa-solid fa-gift';
  }

  if(text.includes('pending')){
    return 'fa-solid fa-hourglass-half';
  }

  return 'fa-solid fa-cart-shopping';
}

getActivityClass(title:string): string {

  const text = title.toLowerCase();

  if(text.includes('refund')){
    return 'orange';
  }

  if(text.includes('check-in')){
    return 'green';
  }

  if(text.includes('complimentary')){
    return 'blue';
  }

  if(text.includes('pending')){
    return 'yellow';
  }

  return 'green';
}






// third section
get ticketSales() {

  const grouped: any = {};

  this.recentOrders.forEach(order => {

    if (!grouped[order.ticketType]) {

      grouped[order.ticketType] = 0;

    }

    grouped[order.ticketType] += order.qty;

  });

  const result = Object.keys(grouped).map(type => ({

    type,

    sold: grouped[type]

  }));

  const maxSold = Math.max(
    ...result.map(x => x.sold)
  );

  return result.map(item => ({

    ...item,

    percent: (item.sold / maxSold) * 100

  }));

}


}
