import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-events',
  imports: [NavbarComponent,SideBarComponent,CommonModule,FormsModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit{
ngOnInit(){
  this.filteredEvents = [...this.events];
}
// events: any[] = [];
events = [

{
  title:'Neon Nights Live',
  type:'Concert',
  organizer:'Live Nation',
  location:'Los Angeles, CA',
  date:'Wed, Jun 25, 2026',
  eventDate:'2026-06-25',
  price:45,
  priceLabel:'From $45',
  status:'Published Event',
  category:'All Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
},

{
  title:'Bassline Festival 2025',
  type:'Festival',
  organizer:'Event Masters',
  location:'San Diego, CA',
  date:'Sat, Jun 28, 2026',
  eventDate:'2026-06-28',
  price:99,
  priceLabel:'From $99',
  status:'Published Event',
  category:'This Month',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
},

{
  title:'Laugh Track Comedy Night',
  type:'Comedy',
  organizer:'Creative Studio',
  location:'Hollywood, CA',
  date:'Mon, Jun 23, 2026',
  eventDate:'2026-06-23',
  price:25,
  priceLabel:'From $25',
  status:'Published Event',
  category:'All Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1516280440614-37939bbacd81'
},

{
  title:'Symphony Under The Stars',
  type:'Theater',
  organizer:'Entertainment Hub',
  location:'Los Angeles, CA',
  date:'Sat, Jul 05, 2026',
  eventDate:'2026-07-05',
  price:65,
  priceLabel:'From $65',
  status:'Published Event',
  category:'This Month',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
},

{
  title:'Summer Sounds Festival',
  type:'Festival',
  organizer:'Live Nation',
  location:'San Diego, CA',
  date:'Jul 11 - Jul 13, 2026',
  eventDate:'2026-07-11',
  price:75,
  priceLabel:'From $75',
  status:'Published Event',
  category:'This Weekend',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'
},

{
  title:'The Midnight Collective',
  type:'Theater',
  organizer:'Creative Studio',
  location:'Los Angeles, CA',
  date:'Thu, Jun 26, 2026',
  eventDate:'2026-06-26',
  price:40,
  priceLabel:'From $40',
  status:'Published Event',
  category:'All Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1503095396549-807759245b35'
},

{
  title:'Warehouse Techno Night',
  type:'Festival',
  organizer:'Event Masters',
  location:'Los Angeles, CA',
  date:'Sat, Jun 29, 2026',
  eventDate:'2026-06-29',
  price:50,
  priceLabel:'From $50',
  status:'Published Event',
  category:'This Weekend',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1503095396549-807759245b35'
},

{
  title:'Entrepreneur Networking Mixer',
  type:'Networking',
  organizer:'Organizer 1',
  location:'Downtown LA',
  date:'Tue, Jun 24, 2026',
  eventDate:'2026-06-24',
  price:0,
  priceLabel:'Free',
  status:'Upcoming',
  category:'Free Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1511578314322-379afb476865'
},

{
  title:'LA Night Hoops',
  type:'Sports',
  organizer:'Organizer 2',
  location:'Los Angeles, CA',
  date:'Sun, Jun 30, 2026',
  eventDate:'2026-06-30',
  price:30,
  priceLabel:'From $30',
  status:'Published Event',
  category:'All Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1546519638-68e109498ffc'
},

{
  title:'Urban Art Exhibition',
  type:'Workshop',
  organizer:'Creative Studio',
  location:'Arts District, LA',
  date:'Jul 02 - Jul 12, 2026',
  eventDate:'2026-07-02',
  price:0,
  priceLabel:'Free',
  status:'Upcoming',
  category:'Free Events',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b'
},

{
  title:'Startup Founders Meetup',
  type:'Networking',
  organizer:'Organizer 1',
  location:'Cairo',
  date:'Fri, Jul 04, 2026',
  eventDate:'2026-07-04',
  price:20,
  priceLabel:'From $20',
  status:'Upcoming',
  category:'This Month',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
},

{
  title:'Tech Innovators Summit',
  type:'Workshop',
  organizer:'Event Masters',
  location:'Alexandria',
  date:'Sat, Jul 19, 2026',
  eventDate:'2026-07-19',
  price:120,
  priceLabel:'From $120',
  status:'Published Event',
  category:'This Month',
  favorite:false,
  saved:false,
  image:'https://images.unsplash.com/photo-1515169067868-5387ec356754'
}

];
filteredEvents: any[] = [];

viewMode: 'grid' | 'list' = 'grid';

selectedCategory = 'All Events';

searchTerm = '';

selectedType = '';
selectedLocation = '';
selectedOrganizer = '';

priceRange = 500;

sortBy = 'relevant';

currentPage = 1;
organizers = [
  'Live Nation',
  'Event Masters',
  'Creative Studio',
  'Entertainment Hub',
  'Organizer 1',
  'Organizer 2'
];
pageSize = 6;
eventTypes = [
  'Concert',
  'Festival',
  'Theater',
  'Comedy',
  'Workshop',
  'Sports',
  'Networking'
];
selectTab(tabName:string){

  this.selectedCategory = tabName;

  this.currentPage = 1;

  this.applyFilters();

}
selectedDateRange: any;


locations = [
  'Cairo',
  'Alexandria',
  'Giza'
];

get allEventsCount() {
  return this.events.length;
}

get freeEventsCount() {
  return this.events.filter(x => x.price === 0).length;
}

get savedEventsCount() {
  return this.events.filter(x => x.favorite).length;
}

get tabs() {
  return [
    {
      name: 'All Events',
      count: this.events.length
    },
    {
      name: 'This Weekend',
      count: this.events.filter(
        x => x.category === 'This Weekend'
      ).length
    },
    {
      name: 'This Month',
      count: this.events.filter(
        x => x.category === 'This Month'
      ).length
    },
    {
      name: 'Free Events',
      count: this.events.filter(
        x => x.price === 0
      ).length
    },
    {
  name: 'Wishlist',
  count: this.events.filter(
    x => x.favorite
  ).length
},

{
  name: 'Saved Events',
  count: this.events.filter(
    x => x.saved
  ).length
}
  ];
}
toggleFavorite(event:any){

  event.favorite = !event.favorite;

  this.applyFilters();

}
toggleSave(event:any){

  event.saved = !event.saved;

  this.applyFilters();

}
selectedTypes: string[] = [];

toggleType(type: string){

  const index =
    this.selectedTypes.indexOf(type);

  if(index > -1){

    this.selectedTypes.splice(index,1);

  }else{

    this.selectedTypes.push(type);

  }

  this.applyFilters();
}
applyFilters() {

  let result = [...this.events];

  result = result.filter(event => {

    const matchSearch =
      !this.searchTerm ||
      event.title
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

    const matchType =
      !this.selectedTypes.length ||
      this.selectedTypes.includes(event.type);
const matchDate =
  !this.selectedDateRange ||
  event.eventDate === this.selectedDateRange;
    const matchLocation =
      !this.selectedLocation ||
      event.location.includes(this.selectedLocation);

    const matchOrganizer =
      !this.selectedOrganizer ||
      event.organizer === this.selectedOrganizer;

    const matchPrice =
      event.price <= this.priceRange;

    return (
  matchSearch &&
  matchType &&
  matchLocation &&
  matchOrganizer &&
  matchPrice &&
  matchDate
);

  });

  if(this.selectedCategory === 'Free Events'){

    result =
      result.filter(x => x.price === 0);

  }

  if(this.selectedCategory === 'Wishlist'){

  result =
    result.filter(x => x.favorite);

}

if(this.selectedCategory === 'Saved Events'){

  result =
    result.filter(x => x.saved);

}
switch (this.sortBy) {

  case 'price':

    result.sort((a, b) => a.price - b.price);

    break;

  case 'newest':

    result.sort(
      (a, b) =>
        new Date(b.eventDate).getTime() -
        new Date(a.eventDate).getTime()
    );

    break;

  case 'oldest':

    result.sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    );

    break;

  case 'relevant':

  default:

    break;
}
  if(
  this.selectedCategory !== 'All Events' &&
  this.selectedCategory !== 'Free Events' &&
  this.selectedCategory !== 'Wishlist' &&
  this.selectedCategory !== 'Saved Events'
){

    result =
      result.filter(
        x => x.category === this.selectedCategory
      );

  }

  this.filteredEvents = result;

}
clearFilters(){

  this.searchTerm = '';

  this.selectedLocation = '';

  this.selectedOrganizer = '';

  this.selectedTypes = [];

  this.priceRange = 500;
this.selectedDateRange = '';
  this.filteredEvents = [...this.events];
}
get totalPages(): number {
  return Math.ceil(this.filteredEvents.length / this.pageSize);
}

get pages(): number[] {
  return Array.from(
    { length: this.totalPages },
    (_, i) => i + 1
  );
}

get paginatedEvents() {
  const start =
    (this.currentPage - 1) * this.pageSize;

  return this.filteredEvents.slice(
    start,
    start + this.pageSize
  );
}

get startItem() {
  return ((this.currentPage - 1) * this.pageSize) + 1;
}

get endItem() {
  return Math.min(
    this.currentPage * this.pageSize,
    this.filteredEvents.length
  );
}

changePage(page:number){
  if(page < 1 || page > this.totalPages) return;
  this.currentPage = page;
}

get visiblePages(): number[] {

  const start =
    Math.max(1, this.currentPage - 2);

  const end =
    Math.min(
      this.totalPages,
      this.currentPage + 2
    );

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

}








}
