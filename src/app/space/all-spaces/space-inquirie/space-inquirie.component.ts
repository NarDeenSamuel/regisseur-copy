import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-space-inquirie',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './space-inquirie.component.html',
  styleUrl: './space-inquirie.component.css'
})
export class SPACEINQUIRIEComponent {
// table
searchTerm = '';

selectedStatus = '';

selectedHost = '';

sortBy = 'Last Updated';

pageSize = 10;

currentPage = 1;

statuses = [
  'OPEN',
  'REPLIED',
  'WAITING ON ME',
  'QUOTE RECEIVED',
  'SHORTLISTED',
  'CLOSED'
];

hosts = [
  'Skyline Events',
  'Loft Studios',
  'Urban Spaces',
  'The Venue NYC',
  'Creative Hub'
];

allInquiries = [

{
id:1,
image:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
space:'Skyline Rooftop',
location:'New York, NY',
title:'Corporate Networking Event',
date:'May 18, 2026',
guests:120,
host:'Skyline Events',
hostLocation:'Manhattan',
status:'OPEN',
lastDate:'May 10',
lastTime:'10:35 AM'
},

{
id:2,
image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300',
space:'Creative Loft',
location:'Brooklyn',
title:'Fashion Photoshoot',
date:'May 20, 2026',
guests:18,
host:'Loft Studios',
hostLocation:'Brooklyn',
status:'REPLIED',
lastDate:'May 09',
lastTime:'05:20 PM'
},

{
id:3,
image:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300',
space:'Garden Venue',
location:'Queens',
title:'Wedding Reception',
date:'June 2, 2026',
guests:220,
host:'Urban Spaces',
hostLocation:'Queens',
status:'WAITING ON ME',
lastDate:'May 11',
lastTime:'08:15 AM'
},

{
id:4,
image:'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=300',
space:'Modern Studio',
location:'New York',
title:'Music Video',
date:'June 8, 2026',
guests:40,
host:'Creative Hub',
hostLocation:'SoHo',
status:'QUOTE RECEIVED',
lastDate:'May 07',
lastTime:'04:40 PM'
},

{
id:5,
image:'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300',
space:'Downtown Hall',
location:'Manhattan',
title:'Startup Conference',
date:'June 12, 2026',
guests:350,
host:'The Venue NYC',
hostLocation:'NYC',
status:'SHORTLISTED',
lastDate:'May 12',
lastTime:'09:10 AM'
},

{
id:6,
image:'https://images.unsplash.com/photo-1464375117522-1311dd6a7b5c?w=300',
space:'Luxury Ballroom',
location:'Brooklyn',
title:'Charity Gala',
date:'June 15, 2026',
guests:400,
host:'Skyline Events',
hostLocation:'Brooklyn',
status:'CLOSED',
lastDate:'May 05',
lastTime:'07:00 PM'
},

{
id:7,
image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300',
space:'Warehouse BK',
location:'Brooklyn',
title:'Concert',
date:'June 20, 2026',
guests:900,
host:'Urban Spaces',
hostLocation:'Brooklyn',
status:'OPEN',
lastDate:'May 08',
lastTime:'11:45 AM'
},

{
id:8,
image:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
space:'Rooftop Lounge',
location:'NY',
title:'Private Dinner',
date:'June 24, 2026',
guests:45,
host:'Skyline Events',
hostLocation:'NY',
status:'REPLIED',
lastDate:'May 10',
lastTime:'03:15 PM'
},

{
id:9,
image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300',
space:'The Grand Hall',
location:'Queens',
title:'Business Summit',
date:'July 3, 2026',
guests:280,
host:'The Venue NYC',
hostLocation:'Queens',
status:'OPEN',
lastDate:'May 09',
lastTime:'01:20 PM'
},

{
id:10,
image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300',
space:'Studio One',
location:'Brooklyn',
title:'Film Production',
date:'July 6, 2026',
guests:35,
host:'Creative Hub',
hostLocation:'Brooklyn',
status:'WAITING ON ME',
lastDate:'May 11',
lastTime:'12:40 PM'
},

{
id:11,
image:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
space:'Open Terrace',
location:'NY',
title:'Birthday Party',
date:'July 9, 2026',
guests:80,
host:'Urban Spaces',
hostLocation:'NY',
status:'QUOTE RECEIVED',
lastDate:'May 13',
lastTime:'09:30 AM'
},

{
id:12,
image:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300',
space:'Classic Hall',
location:'Bronx',
title:'Graduation Ceremony',
date:'July 12, 2026',
guests:500,
host:'The Venue NYC',
hostLocation:'Bronx',
status:'SHORTLISTED',
lastDate:'May 14',
lastTime:'04:10 PM'
}

];

filteredInquiries = [...this.allInquiries];

ngOnInit(): void {

  this.filteredInquiries = [...this.allInquiries];

  this.applyFilters();
  this.buildSummary();

}
get totalPages(): number {

  return Math.ceil(
    this.filteredInquiries.length / this.pageSize
  );

}

get paginatedInquiries() {

  const start =
    (this.currentPage - 1) * this.pageSize;

  return this.filteredInquiries.slice(
    start,
    start + this.pageSize
  );

}


get startItem() {

  if (!this.filteredInquiries.length) return 0;

  return (
    (this.currentPage - 1) * this.pageSize
  ) + 1;

}

get endItem() {

  return Math.min(

    this.currentPage * this.pageSize,

    this.filteredInquiries.length

  );

}
get visiblePages() {

  const pages = [];

  for (let i = 1; i <= this.totalPages; i++) {

    pages.push(i);

  }

  return pages;

}
changePage(page: number) {

  if (

    page < 1 ||

    page > this.totalPages

  ) return;

  this.currentPage = page;

}
applyFilters() {

  this.filteredInquiries =
    this.allInquiries.filter(item => {

      const matchSearch =

        !this.searchTerm ||

        item.space.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

        item.host.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

        item.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchStatus =

        !this.selectedStatus ||

        item.status === this.selectedStatus;

      const matchHost =

        !this.selectedHost ||

        item.host === this.selectedHost;

      return (

        matchSearch &&

        matchStatus &&

        matchHost

      );

    });

  this.setSort(this.sortBy);

  this.changePage(1);

}
setSort(type: string): void {

  this.sortBy = type;

  switch (type) {

    case 'Newest':

      this.filteredInquiries.sort((a, b) => b.id - a.id);

      break;

    case 'Oldest':

      this.filteredInquiries.sort((a, b) => a.id - b.id);

      break;

    default:

      this.filteredInquiries.sort((a, b) =>

        new Date(b.lastDate).getTime() -

        new Date(a.lastDate).getTime()

      );

      break;

  }

}
chatInquiry(inquiry: any): void {

  console.log('Chat', inquiry);

}
calendarInquiry(inquiry: any): void {

  console.log('Calendar', inquiry);

}
saveInquiry(inquiry: any): void {

  inquiry.saved = !inquiry.saved;

}
moreInquiry(inquiry: any): void {

  console.log(inquiry);

}


// right side
chart:any;

totalInquiries=0;

inquirySummary:any[]=[];
buildSummary(){

const statuses=[

{
name:'Open',
key:'OPEN',
color:'#1677ff'
},

{
name:'Replied',
key:'REPLIED',
color:'#18c964'
},

{
name:'Waiting on Me',
key:'WAITING ON ME',
color:'#ffb400'
},

{
name:'Quotes Received',
key:'QUOTE RECEIVED',
color:'#7c3aed'
},

{
name:'Shortlisted',
key:'SHORTLISTED',
color:'#d946ef'
},

{
name:'Closed',
key:'CLOSED',
color:'#666666'
}

];

this.totalInquiries=this.allInquiries.length;

this.inquirySummary=statuses.map(x=>{

const count=this.allInquiries.filter(i=>i.status===x.key).length;

return{

...x,

count,

percent:Math.round((count/this.totalInquiries)*100)

};

});

this.loadChart();

}
loadChart(){

if(this.chart){

this.chart.destroy();

}

this.chart=new Chart('inquiryChart',{

type:'doughnut',

data:{

labels:this.inquirySummary.map(x=>x.name),

datasets:[{

data:this.inquirySummary.map(x=>x.count),

backgroundColor:this.inquirySummary.map(x=>x.color),

borderWidth:0,

hoverOffset:3

}]

},

options:{

cutout:'72%',

plugins:{

legend:{

display:false

}

},

responsive:true,

maintainAspectRatio:false

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
      this.newInquiry();
      break;

    case 'calendar':
      this.browseSpaces();
      break;

    case 'savedSpaces':
      this.savedSpaces();
      break;

    case 'report':
      this.reviewProposals();
      break;

    case 'saved':
      this.spaceBookingHelp();
      break;

  }

}
newInquiry() {

  console.log('New Space Inquiry');

}

browseSpaces() {

  console.log('Browse Spaces');

}

savedSpaces() {

  console.log('View Saved Spaces');

}

reviewProposals() {

  console.log('Review Proposals');

}

spaceBookingHelp() {

  console.log('Space Booking Help');

}

visitHelpCenter(): void {

  console.log('Visit Help Center');

  // مثال:
  // this.router.navigate(['/help-center']);

  // أو
  // window.open('https://your-help-center.com','_blank');

}
}
