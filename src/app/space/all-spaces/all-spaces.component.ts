import {NavbarComponent} from '../../navbar/navbar.component';
import {SideBarComponent} from '../../side-bar/side-bar.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SPACEINQUIRIEComponent } from './space-inquirie/space-inquirie.component';
import { SPACEBOOKINGSComponent } from "./space-bookings/space-bookings.component";
declare var bootstrap: any;

@Component({
  selector: 'app-all-spaces',
  imports: [SideBarComponent, NavbarComponent, CommonModule, ReactiveFormsModule, FormsModule, SPACEINQUIRIEComponent, SPACEBOOKINGSComponent],
  templateUrl: './all-spaces.component.html',
  styleUrl: './all-spaces.component.css'
})
export class AllSpacesComponent {
  get showSpacesToolbar(): boolean {

  return (
    this.selectedCategory !== 'SPACE INQUIRIES' &&
    this.selectedCategory !== 'SPACE BOOKINGS'
  );

}
viewMode: 'grid' | 'list' = 'grid';

sortBy = 'recommended';

selectedCategory = 'ALL SPACES';

filteredSpaces: any[] = [];


currentPage = 1;
pageSize = 6;

tabs = [
  { name: 'ALL SPACES', count: 0 },
  { name: 'EVENT VENUES', count: 0 },
  { name: 'STUDIOS', count: 0 },
  { name: 'ROOFTOPS', count: 0 },
  { name: 'GALLERIES', count: 0 },
  { name: 'MEETING ROOMS', count: 0 },
  { name: 'OUTDOOR SPACES', count: 0 },
  { name: 'SPACE INQUIRIES', count: 0 },
  { name: 'SPACE BOOKINGS', count: 0 },
  { name: 'SAVED SPACES', count: 0 },
  { name: 'FAVORITES', count: 0 }
];
updateTabsCount() {

  this.tabs.forEach(tab => {

    switch (tab.name) {

      case 'ALL SPACES':
        tab.count = this.allSpaces.length;
        break;

      case 'EVENT VENUES':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Event Venue').length;
        break;

      case 'STUDIOS':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Studio').length;
        break;

      case 'ROOFTOPS':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Rooftop').length;
        break;

      case 'GALLERIES':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Gallery').length;
        break;

      case 'MEETING ROOMS':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Meeting Room').length;
        break;

      case 'OUTDOOR SPACES':
        tab.count = this.allSpaces.filter(x => x.spaceType === 'Outdoor Space').length;
        break;

      case 'SAVED SPACES':
        tab.count = this.allSpaces.filter(x => x.saved).length;
        break;

      case 'FAVORITES':
        tab.count = this.allSpaces.filter(x => x.favorite).length;
        break;

      case 'SPACE BOOKINGS':
      case 'SPACE INQUIRIES':
        tab.count = 0;
        break;

    }

  });

}
ngOnInit(): void {

  this.filteredSpaces = [...this.allSpaces];

  this.loadFilters();

  this.updateTabsCount();

  this.applyFilters();

}
selectTab(tab: string): void {

  this.selectedCategory = tab;

  this.applyFilters();

}
changeView(mode: 'grid' | 'list'): void {

  this.viewMode = mode;

}
setSort(type: string): void {

  this.sortBy = type;

  switch (type) {

    case 'recommended':

      this.filteredSpaces.sort((a, b) => b.rating - a.rating);

      break;

    case 'newest':

      this.filteredSpaces.sort(
        (a, b) =>
          new Date(b.dateUtc).getTime() -
          new Date(a.dateUtc).getTime()
      );

      break;

    case 'price':

      this.filteredSpaces.sort(
        (a, b) => a.price - b.price
      );

      break;

  }

  this.changePage(1);

}
get totalPages(): number {

  return Math.ceil(
    this.filteredSpaces.length / this.pageSize
  );

}
get paginatedSpaces() {

  const start =
    (this.currentPage - 1) * this.pageSize;

  return this.filteredSpaces.slice(
    start,
    start + this.pageSize
  );

}
// allSpaces: any[] = [];
allSpaces = [

{
  id:1,
  name:'The Brooklyn Loft',
  city:'Brooklyn, NY',
imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' ,
 status:'Available',
  spaceType:'Event Venue',
  bookingType:'Whole Space',
  capacity:250,
  price:2500,
  currency:'USD',
  rating:4.8,
  reviews:128,
  minimumHours:6,
  availableDate:'2026-06-30',
  availableTime:'09:00',
  amenities:['WiFi','Parking','Stage'],
  favorite:false,
  saved:false
},

{
  id:2,
  name:'Skyline Rooftop',
  city:'Manhattan, NY',
 imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Available',
  spaceType:'Rooftop',
  bookingType:'Whole Space',
  capacity:150,
  price:3200,
  currency:'USD',
  rating:4.9,
  reviews:96,
  minimumHours:3,
  availableDate:'2026-07-01',
  availableTime:'18:00',
  amenities:['WiFi','Bar','Parking'],
  favorite:false,
  saved:false
},

{
  id:3,
  name:'Creative Photo Studio',
  city:'Queens, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Available',
  spaceType:'Studio',
  bookingType:'Partial Space',
  capacity:20,
  price:120,
  currency:'USD',
  rating:4.7,
  reviews:54,
  minimumHours:2,
  availableDate:'2026-07-02',
  availableTime:'10:00',
  amenities:['WiFi','Lighting','Parking'],
  favorite:true,
  saved:false
},

{
  id:4,
  name:'SoHo Art Gallery',
  city:'Manhattan, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Busy',
  spaceType:'Gallery',
  bookingType:'Whole Space',
  capacity:80,
  price:1800,
  currency:'USD',
  rating:4.6,
  reviews:63,
  minimumHours:6,
  availableDate:'2026-07-03',
  availableTime:'12:00',
  amenities:['Parking','Security'],
  favorite:false,
  saved:false
},

{
  id:5,
  name:'Executive Boardroom',
  city:'New York, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Available',
  spaceType:'Meeting Room',
  bookingType:'Partial Space',
  capacity:20,
  price:65,
  currency:'USD',
  rating:4.8,
  reviews:72,
  minimumHours:1,
  availableDate:'2026-07-01',
  availableTime:'08:00',
  amenities:['Projector','WiFi','Coffee'],
  favorite:false,
  saved:true
},

{
  id:6,
  name:'Garden Courtyard',
  city:'Brooklyn, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Available',
  spaceType:'Outdoor Space',
  bookingType:'Whole Space',
  capacity:200,
  price:2000,
  currency:'USD',
  rating:4.7,
  reviews:86,
  minimumHours:4,
  availableDate:'2026-07-05',
  availableTime:'16:00',
  amenities:['Parking','Garden','Stage'],
  favorite:true,
  saved:false
},

{
  id:7,
  name:'The Warehouse BK',
  city:'Brooklyn, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Busy',
  spaceType:'Event Venue',
  bookingType:'Whole Space',
  capacity:800,
  price:4000,
  currency:'USD',
  rating:4.9,
  reviews:112,
  minimumHours:6,
  availableDate:'2026-07-10',
  availableTime:'19:00',
  amenities:['Parking','Stage','VIP Area'],
  favorite:false,
  saved:false
},

{
  id:8,
  name:'Luxe Lounge',
  city:'Manhattan, NY',
  imageUrl:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  status:'Available',
  spaceType:'Event Venue',
  bookingType:'Partial Space',
  capacity:60,
  price:1200,
  currency:'USD',
  rating:4.6,
  reviews:59,
  minimumHours:3,
  availableDate:'2026-07-04',
  availableTime:'18:30',
  amenities:['Bar','WiFi','Parking'],
  favorite:false,
  saved:false
}

];
changePage(page: number): void {

  if (
    page < 1 ||
    page > this.totalPages
  ) {

    return;

  }

  this.currentPage = page;

}
get startItem() {

  if (!this.filteredSpaces.length) return 0;

  return (this.currentPage - 1) * this.pageSize + 1;

}
get endItem() {

  return Math.min(

    this.currentPage * this.pageSize,

    this.filteredSpaces.length

  );

}
applyFilters(): void {

  let spaces = [...this.allSpaces];

  // Tabs

  switch (this.selectedCategory) {

    case 'EVENT VENUES':
      spaces = spaces.filter(x => x.spaceType === 'Event Venue');
      break;

    case 'STUDIOS':
      spaces = spaces.filter(x => x.spaceType === 'Studio');
      break;

    case 'ROOFTOPS':
      spaces = spaces.filter(x => x.spaceType === 'Rooftop');
      break;

    case 'GALLERIES':
      spaces = spaces.filter(x => x.spaceType === 'Gallery');
      break;

    case 'MEETING ROOMS':
      spaces = spaces.filter(x => x.spaceType === 'Meeting Room');
      break;

    case 'OUTDOOR SPACES':
      spaces = spaces.filter(x => x.spaceType === 'Outdoor Space');
      break;

    case 'SAVED SPACES':
      spaces = spaces.filter(x => x.saved);
      break;

    case 'FAVORITES':
      spaces = spaces.filter(x => x.favorite);
      break;
  }

  this.filteredSpaces = spaces.filter(space => {

    const matchSearch =
      !this.searchTerm ||
      space.name.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchLocation =
      !this.selectedLocation ||
      space.city === this.selectedLocation;

    const matchType =
      !this.selectedSpaceType ||
      space.spaceType === this.selectedSpaceType;

    const matchCapacity =
      space.capacity <= this.capacity;

    const matchBooking =
      !this.bookingType ||
      space.bookingType === this.bookingType;

    const matchPrice =
      space.price <= this.priceRange;

    const matchAmenity =
      !this.selectedAmenity ||
      space.amenities.includes(this.selectedAmenity);

    const matchDate =
      !this.selectedDate ||
      space.availableDate === this.selectedDate;

    const matchTime =
      !this.selectedTime ||
      space.availableTime === this.selectedTime;

    return (

      matchSearch &&

      matchLocation &&

      matchType &&

      matchCapacity &&

      matchBooking &&

      matchPrice &&

      matchAmenity &&

      matchDate &&

      matchTime

    );

  });

  this.setSort(this.sortBy);

}
setBookingType(type: string) {

  this.bookingType = type;

  this.applyFilters();

}
searchTerm = '';

selectedLocation = '';

selectedRadius = 25;

selectedSpaceType = '';

capacity = 1000;

bookingType = '';

selectedDate = '';

selectedTime = '';

priceRange = 10000;

selectedAmenity = '';

locations: string[] = [];

spaceTypes: string[] = [];

amenities: string[] = [];

radiusList = [5,10,25,50,100];


clearFilters() {

  this.searchTerm = '';

  this.selectedLocation = '';

  this.selectedRadius = 25;

  this.selectedSpaceType = '';

  this.capacity = 1000;

  this.bookingType = '';

  this.selectedDate = '';

  this.selectedTime = '';

  this.priceRange = 10000;

  this.selectedAmenity = '';

  this.applyFilters();

}
loadFilters() {

  this.locations = [
    ...new Set(
      this.allSpaces.map(x => x.city)
    )
  ];

  this.spaceTypes = [
    ...new Set(
      this.allSpaces.map(x => x.spaceType)
    )
  ];

  this.amenities = [
    ...new Set(
      this.allSpaces.flatMap(x => x.amenities ?? [])
    )
  ];

}
toggleFavorite(space:any){

  space.favorite=!space.favorite;

  this.updateTabsCount();

  this.applyFilters();

}
toggleSave(space:any){

  space.saved=!space.saved;

  this.updateTabsCount();

  this.applyFilters();

}
get visiblePages(): number[] {

  const pages: number[] = [];

  for (let i = 1; i <= this.totalPages; i++) {
    pages.push(i);
  }

  return pages;

}
selectedSpace: any = null;

openSpace(space: any) {

  this.selectedSpace = space;

  // لو عندك مودال افتحيه هنا
  // new bootstrap.Modal(...).show();

}



}
