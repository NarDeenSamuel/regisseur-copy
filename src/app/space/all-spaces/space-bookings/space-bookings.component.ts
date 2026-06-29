import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-space-bookings',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './space-bookings.component.html',
  styleUrl: './space-bookings.component.css'
})
export class SPACEBOOKINGSComponent {
searchTerm = '';

selectedStatus = '';

selectedPayment = '';

sortBy = 'Booking Date';

pageSize = 10;

currentPage = 1;

statuses = [
  'CONFIRMED',
  'COMPLETED',
  'PENDING'
];

payments = [
  'PAID',
  'DEPOSIT PAID',
  'PENDING'
];

allBookings = [

{
id:1,
image:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
bookingName:'Corporate Networking Event',
bookingId:'BK-2025-0541',
space:'Skyline Rooftop',
location:'New York, NY',
bookedBy:'TechNova Inc.',
contact:'Sarah Johnson',
date:'Jun 15, 2025',
time:'6:00 PM - 10:00 PM',
status:'CONFIRMED',
payment:'PAID',
paymentDate:'May 20, 2025',
total:8500,
saved:false
},

{
id:2,
image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300',
bookingName:'Brand Launch Event',
bookingId:'BK-2025-0532',
space:'The Brooklyn Loft',
location:'Brooklyn, NY',
bookedBy:'Luxe Brand Co.',
contact:'Michael Lee',
date:'Jun 18, 2025',
time:'5:00 PM - 11:00 PM',
status:'CONFIRMED',
payment:'DEPOSIT PAID',
paymentDate:'May 22, 2025',
total:12000,
saved:false
},

{
id:3,
image:'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=300',
bookingName:'Art Exhibition',
bookingId:'BK-2025-0527',
space:'SoHo Art Gallery',
location:'New York, NY',
bookedBy:'Creative Minds',
contact:'Emma Davis',
date:'May 25 - Jun 1, 2025',
time:'All Day',
status:'COMPLETED',
payment:'PAID',
paymentDate:'May 10, 2025',
total:5200,
saved:false
},

{
id:4,
image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300',
bookingName:'Board Meeting',
bookingId:'BK-2025-0518',
space:'Executive Boardroom',
location:'Miami, FL',
bookedBy:'Global Finance Ltd.',
contact:'David Chen',
date:'May 20, 2025',
time:'9:00 AM - 1:00 PM',
status:'COMPLETED',
payment:'PAID',
paymentDate:'May 18, 2025',
total:1200,
saved:false
},

{
id:5,
image:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300',
bookingName:'Wedding Reception',
bookingId:'BK-2025-0509',
space:'Garden Courtyard',
location:'Austin, TX',
bookedBy:'Jessica & Mark',
contact:'Jessica Brown',
date:'May 17, 2025',
time:'4:00 PM - 11:00 PM',
status:'COMPLETED',
payment:'PAID',
paymentDate:'May 12, 2025',
total:9800,
saved:false
},

{
id:6,
image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300',
bookingName:'Photoshoot',
bookingId:'BK-2025-0501',
space:'Creative Photo Studio',
location:'Los Angeles, CA',
bookedBy:'Visionary Media',
contact:'Olivia Martinez',
date:'May 14, 2025',
time:'8:00 AM - 2:00 PM',
status:'CONFIRMED',
payment:'PENDING',
paymentDate:'May 14, 2025',
total:950,
saved:false
},

{
id:7,
image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300',
bookingName:'Annual Conference',
bookingId:'BK-2025-0495',
space:'Grand Ballroom',
location:'Chicago, IL',
bookedBy:'Summit Events',
contact:'James Wilson',
date:'Jul 10 - Jul 11, 2025',
time:'8:00 AM - 6:00 PM',
status:'CONFIRMED',
payment:'DEPOSIT PAID',
paymentDate:'May 15, 2025',
total:24000,
saved:false
},

{
id:8,
image:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
bookingName:'Private Dinner',
bookingId:'BK-2025-0490',
space:'Sunset Terrace',
location:'San Diego, CA',
bookedBy:'Private Client',
contact:'Hannah Scott',
date:'May 30, 2025',
time:'7:00 PM - 11:00 PM',
status:'PENDING',
payment:'PENDING',
paymentDate:'May 22, 2025',
total:3600,
saved:false
}

];

filteredBookings = [...this.allBookings];


ngOnInit(): void {

  this.filteredBookings = [...this.allBookings];

  this.applyFilters();
    this.buildBookingSummary();


}

get totalPages(): number {

  return Math.ceil(
    this.filteredBookings.length / this.pageSize
  );

}

get paginatedBookings() {

  const start =

    (this.currentPage - 1) * this.pageSize;

  return this.filteredBookings.slice(

    start,

    start + this.pageSize

  );

}
get startItem() {

  if (!this.filteredBookings.length) return 0;

  return (

    (this.currentPage - 1) * this.pageSize

  ) + 1;

}

get endItem() {

  return Math.min(

    this.currentPage * this.pageSize,

    this.filteredBookings.length

  );

}
get visiblePages() {

  const pages = [];

  for (let i = 1; i <= this.totalPages; i++) {

    pages.push(i);

  }

  return pages;

}
changePage(page:number){

  if(page<1 || page>this.totalPages) return;

  this.currentPage = page;

}
applyFilters(){

  this.filteredBookings =

  this.allBookings.filter(item=>{

    const matchSearch =

      !this.searchTerm ||

      item.bookingName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      item.space.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      item.bookedBy.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchStatus =

      !this.selectedStatus ||

      item.status===this.selectedStatus;

    const matchPayment =

      !this.selectedPayment ||

      item.payment===this.selectedPayment;

    return (

      matchSearch &&

      matchStatus &&

      matchPayment

    );

  });

  this.setSort(this.sortBy);

  this.changePage(1);

}
setSort(type:string){

  this.sortBy = type;

  switch(type){

    case 'Highest Price':

      this.filteredBookings.sort(

        (a,b)=>b.total-a.total

      );

    break;

    case 'Lowest Price':

      this.filteredBookings.sort(

        (a,b)=>a.total-b.total

      );

    break;

    default:

      this.filteredBookings.sort(

        (a,b)=>b.id-a.id

      );

    break;

  }

}
clearFilters(){

  this.searchTerm='';

  this.selectedStatus='';

  this.selectedPayment='';

  this.sortBy='Booking Date';

  this.applyFilters();

}
viewBooking(item:any){

  console.log('View Booking',item);

}

chatBooking(item:any){

  console.log('Chat Booking',item);

}

moreBooking(item:any){

  console.log('More',item);

}
trackByBooking(index:number,item:any){

  return item.id;

}

// right side


bookingChart: any;

selectedYear = 'This Year';

totalBookings = 0;

totalRevenue = 0;

averageBooking = 0;

bookingSummary: any[] = [];

buildBookingSummary() {

  const summary = [

    {
      name: 'Completed',
      key: 'COMPLETED',
      color: '#22c55e'
    },

    {
      name: 'Confirmed',
      key: 'CONFIRMED',
      color: '#1d7dff'
    },

    {
      name: 'Pending',
      key: 'PENDING',
      color: '#f5b301'
    },

    {
      name: 'Cancelled',
      key: 'CANCELLED',
      color: '#9333ea'
    }

  ];

  this.totalBookings = this.allBookings.length;

  this.totalRevenue = this.allBookings.reduce(
    (sum, item) => sum + item.total,
    0
  );

  this.averageBooking = this.totalBookings
    ? this.totalRevenue / this.totalBookings
    : 0;

  this.bookingSummary = summary.map(item => {

    const count = this.allBookings.filter(
      x => x.status === item.key
    ).length;

    return {

      ...item,

      count,

      percent: this.totalBookings
        ? Math.round((count * 100) / this.totalBookings)
        : 0

    };

  });

  this.loadBookingChart();

}
refreshSummary(){

   this.buildBookingSummary();

}
updateStatus(item:any,status:string){

item.status=status;

this.buildBookingSummary();

}
addBooking(item:any){

this.allBookings.unshift(item);

this.buildBookingSummary();

}

loadBookingChart() {

  if (this.bookingChart) {
    this.bookingChart.destroy();
  }

  this.bookingChart = new Chart('bookingChart', {

    type: 'doughnut',

    data: {

      labels: this.bookingSummary.map(x => x.name),

      datasets: [
        {

          data: this.bookingSummary.map(x => x.count),

          backgroundColor: this.bookingSummary.map(x => x.color),

          borderWidth: 0,

          hoverOffset: 4

        }
      ]

    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      cutout: '68%',

      plugins: {

        legend: {

          display: false

        },

        tooltip: {

          backgroundColor: '#181818',

          titleColor: '#fff',

          bodyColor: '#fff',

          borderColor: '#333',

          borderWidth: 1

        }

      }

    }

  });

}
quickActions = [

{
  title:'New Space Booking',
  description:'Create a new booking',
  icon:'fa-solid fa-plus',
  action:'new'
},

{
  title:'Calendar View',
  description:'View bookings calendar',
  icon:'fa-regular fa-calendar',
  action:'calendar'
},

{
  title:'Manage Payments',
  description:'Track payments & invoices',
  icon:'fa-regular fa-credit-card',
  action:'payments'
},

{
  title:'Download Report',
  description:'Export bookings report',
  icon:'fa-solid fa-download',
  action:'report'
},

{
  title:'Saved Bookings',
  description:'View your saved bookings',
  icon:'fa-regular fa-bookmark',
  action:'saved'
}

];
quickAction(action: string): void {

  switch(action){

    case 'new':
      this.newBooking();
      break;

    case 'calendar':
      this.calendarView();
      break;

    case 'payments':
      this.managePayments();
      break;

    case 'report':
      this.downloadReport();
      break;

    case 'saved':
      this.savedBookings();
      break;

  }

}
newBooking(){

  console.log('Create New Booking');

  // this.router.navigate(['/space/new-booking']);

}
calendarView(){

  console.log('Calendar View');

  // this.router.navigate(['/calendar']);

}

managePayments(){

  console.log('Manage Payments');

  // this.router.navigate(['/payments']);

}
downloadReport(){

  console.log('Download Report');

  // API

}

savedBookings(){

  console.log('Saved Bookings');

  // this.router.navigate(['/saved-bookings']);

}
visitHelpCenter(): void {

  console.log('Visit Help Center');

  // مثال:
  // this.router.navigate(['/help-center']);

  // أو
  // window.open('https://your-help-center.com','_blank');

}
}
