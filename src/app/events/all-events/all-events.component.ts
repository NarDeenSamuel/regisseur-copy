import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { EventService } from '../../core/services/event/event-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-all-events',
  imports: [NavbarComponent,SideBarComponent,CommonModule,FormsModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit{
ngOnInit(): void {

  this.loadEvents();

}

  countries = [
    { name: 'United States', code: '+1', flag: 'assets/flags/us.svg' },
    { name: 'Egypt', code: '+20', flag: 'assets/flags/eg.svg' },
    { name: 'Saudi Arabia', code: '+966', flag: 'assets/flags/sa.svg' },
    { name: 'United Arab Emirates', code: '+971', flag: 'assets/flags/ae.svg' },
    { name: 'United Kingdom', code: '+44', flag: 'assets/flags/gb.svg' },
    { name: 'France', code: '+33', flag: 'assets/flags/fr.svg' },
    { name: 'Germany', code: '+49', flag: 'assets/flags/de.svg' },
    { name: 'Italy', code: '+39', flag: 'assets/flags/it.svg' },
    { name: 'Spain', code: '+34', flag: 'assets/flags/es.svg' },
    { name: 'Canada', code: '+1', flag: 'assets/flags/ca.svg' },
    { name: 'Brazil', code: '+55', flag: 'assets/flags/br.svg' },
    { name: 'Argentina', code: '+54', flag: 'assets/flags/ar.svg' },
    { name: 'Mexico', code: '+52', flag: 'assets/flags/mx.svg' },
    { name: 'India', code: '+91', flag: 'assets/flags/in.svg' },
    { name: 'China', code: '+86', flag: 'assets/flags/cn.svg' },
    { name: 'Japan', code: '+81', flag: 'assets/flags/jp.svg' },
    { name: 'South Korea', code: '+82', flag: 'assets/flags/kr.svg' },
    { name: 'Turkey', code: '+90', flag: 'assets/flags/tr.svg' },
    { name: 'Russia', code: '+7', flag: 'assets/flags/ru.svg' },
    { name: 'Australia', code: '+61', flag: 'assets/flags/au.svg' },
    { name: 'South Africa', code: '+27', flag: 'assets/flags/za.svg' },
    { name: 'Qatar', code: '+974', flag: 'assets/flags/qa.svg' },
    { name: 'Kuwait', code: '+965', flag: 'assets/flags/kw.svg' },
    { name: 'Bahrain', code: '+973', flag: 'assets/flags/bh.svg' },
    { name: 'Oman', code: '+968', flag: 'assets/flags/om.svg' },
    { name: 'Jordan', code: '+962', flag: 'assets/flags/jo.svg' },
    { name: 'Lebanon', code: '+961', flag: 'assets/flags/lb.svg' },
    { name: 'Morocco', code: '+212', flag: 'assets/flags/ma.svg' },
    { name: 'Tunisia', code: '+216', flag: 'assets/flags/tn.svg' },
    { name: 'Algeria', code: '+213', flag: 'assets/flags/dz.svg' }
  ];
selectedCountry = this.countries[1];
showCountryDropdown = false;

selectCountry(country:any){
  this.selectedCountry = country;
  this.showCountryDropdown = false;
}
selectedEvent: any = null;

quantity = 1;

selectedTicket: any = null;

openEventModal(event: any) {

  this.selectedEvent = event;

  if (
    event.ticketTiers &&
    event.ticketTiers.length
  ) {

    this.selectedTicket =
      event.ticketTiers[0];

  }

  this.quantity = 1;

}
selectTicket(ticket: any) {

  this.selectedTicket = ticket;

}

increaseQty() {

  const maxQty =
    this.selectedTicket?.quantity || 1;

  if (this.quantity < maxQty) {

    this.quantity++;

  }

}

decreaseQty() {

  if (this.quantity > 1) {

    this.quantity--;

  }

}
get subtotal(): number {

  return (
    (this.selectedTicket?.price || 0)
    * this.quantity
  );

}

get serviceFee(): number {

  return +(this.subtotal * 0.15)
    .toFixed(2);

}

get total(): number {

  return this.subtotal +
         this.serviceFee;

}
closeModal() {

  const modalElement =
    document.getElementById(
      'eventDetailsModal'
    );

  if (!modalElement) return;

  const modal =
    bootstrap.Modal.getInstance(
      modalElement
    );

  modal?.hide();

  this.currentStep = 1;

  this.quantity = 1;

}

currentStep = 1;
today = new Date();
completePurchase() {
  this.currentStep = 3;
}
goToCheckout() {

  if (!this.selectedTicket) {
    return;
  }

  this.currentStep = 2;
}

backToTickets() {

  this.currentStep = 1;
}

constructor(
  private eventService: EventService
) {}
setSort(type: string) {

  this.sortBy = type;

  this.applyFilters();

}

loadEvents(): void {

  this.eventService
    .getEvents()
    .subscribe({

      next: (res) => {

        this.events = res.items.map((event: any) => ({
          ...event,
          favorite: false,
          saved: false
        }));

        this.filteredEvents = [...this.events];

        this.loadWishlist();
this.loadSavedEvents();
      },

      error: (err) => {

        console.error(err);

      }

    });

}
loadWishlist() {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  if (!user.id) return;

  this.eventService
    .getFavorites(user.id)
    .subscribe({

      next: (favorites) => {

        const favoriteIds =
          favorites.map(
            (f: any) => f.id
          );

        this.wishlistEvents =
          this.events
            .filter(event =>
              favoriteIds.includes(
                event.id
              )
            )
            .map(event => ({
              ...event,
              favorite: true
            }));

        this.events.forEach(event => {

          event.favorite =
            favoriteIds.includes(
              event.id
            );

        });

        this.savedEvents.forEach(event => {

          event.favorite =
            favoriteIds.includes(
              event.id
            );

        });

        if (
          this.selectedCategory ===
          'Wishlist'
        ) {

          this.filteredEvents =
            [...this.wishlistEvents];

        }

      },

      error: err => {

        console.error(err);

      }

    });

}
loadSavedEvents() {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  if (!user.id) return;

  this.eventService
    .getWishlist(user.id)
    .subscribe({

      next: (saved) => {

        const savedIds =
          saved.map(
            (s: any) => s.id
          );

        this.savedEvents =
          this.events
            .filter(event =>
              savedIds.includes(
                event.id
              )
            )
            .map(event => ({
              ...event,
              saved: true
            }));

        this.events.forEach(event => {

          event.saved =
            savedIds.includes(
              event.id
            );

        });

        this.wishlistEvents.forEach(event => {

          event.saved =
            savedIds.includes(
              event.id
            );

        });

        if (
          this.selectedCategory ===
          'Saved Events'
        ) {

          this.filteredEvents =
            [...this.savedEvents];

        }

      },

      error: err => {

        console.error(err);

      }

    });

}
events: any[] = [];
savedEvents: any[] = [];
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
  'Organizer',
  'Producer'
];
pageSize = 6;
eventTypes = [
  'CONFERENCE',
  'FESTIVAL',
  'EXHIBITION',
  'COMPETITION',
  'SCREENING / BROADCAST'
];
selectTab(tabName: string) {

  this.selectedCategory = tabName;

  this.currentPage = 1;

  if (tabName === 'Wishlist') {

    this.filteredEvents =
      [...this.wishlistEvents];

    return;

  }
  if (tabName === 'Saved Events') {

  this.filteredEvents =
    [...this.savedEvents];

  return;

}

  this.applyFilters();

}
selectedDateRange: any;


locations = [
  'Cairo',
  'Alexandria',
  'Giza'
];
wishlistEvents: any[] = [];
get allEventsCount() {
  return this.events.length;
}

get freeEventsCount() {
  return this.events.filter(x => x.price === 0).length;
}

get savedEventsCount() {
  return this.savedEvents.length;
}

get tabs() {
  return [
    {
      name: 'All Events',
      count: this.events.length
    },
   {
  name: 'This Weekend',
  count: this.events.filter(event => {

    const today = new Date();

    const weekendEnd = new Date(today);

    weekendEnd.setDate(today.getDate() + 7);

    const eventDate =
      new Date(event.dateUtc);

    return (
      eventDate >= today &&
      eventDate <= weekendEnd
    );

  }).length
},
    {
  name: 'This Month',
  count: this.events.filter(event => {

    const now = new Date();

    const eventDate =
      new Date(event.dateUtc);

    return (
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear()
    );

  }).length
},
   {
  name: 'Free Events',
  count: this.events.filter(
    x => x.ticketingMode === 'Free'
  ).length
},
{
  name: 'Wishlist',
  count: this.wishlistEvents.length
},

{
  name: 'Saved Events',
  count: this.savedEvents.length
}
  ];
}
toggleFavorite(event: any) {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const userId = user.id;

  if (!userId) return;

  const request = event.favorite

    ? this.eventService.removeFromFavorite(
        event.id,
        userId
      )

    : this.eventService.addToFavorite(
        event.id,
        userId
      );

  request.subscribe({

    next: () => {

      this.loadWishlist();

      if (
        this.selectedCategory ===
        'Wishlist'
      ) {

        setTimeout(() => {

          this.filteredEvents =
            [...this.wishlistEvents];

        });

      }

      if (
        this.selectedCategory ===
        'Saved Events'
      ) {

        setTimeout(() => {

          this.filteredEvents =
            [...this.savedEvents];

        });

      }

    },

    error: err => {

      console.error(
        'Favorite Error',
        err
      );

    }

  });

}
toggleSave(event: any) {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const userId = user.id;

  if (!userId) return;

  const request = event.saved

    ? this.eventService.removeFromWishlist(
        event.id,
        userId
      )

    : this.eventService.addToWishlist(
        event.id,
        userId
      );

  request.subscribe({

    next: () => {

      this.loadSavedEvents();

      if (
        this.selectedCategory ===
        'Saved Events'
      ) {

        setTimeout(() => {

          this.filteredEvents =
            [...this.savedEvents];

        });

      }

      if (
        this.selectedCategory ===
        'Wishlist'
      ) {

        setTimeout(() => {

          this.filteredEvents =
            [...this.wishlistEvents];

        });

      }

    },

    error: err => {

      console.error(
        'Save Error',
        err
      );

    }

  });

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

  // Search

  if (this.searchTerm) {

    result = result.filter(event =>
      event.name?.toLowerCase()
      .includes(this.searchTerm.toLowerCase())
    );

  }

  // Event Type

  if (this.selectedTypes.length) {

    result = result.filter(event =>
      this.selectedTypes.includes(
        event.eventTypeName
      )
    );

  }

  // Date

  if (this.selectedDateRange) {

    result = result.filter(event => {

      const eventDate =
        new Date(event.dateUtc)
          .toISOString()
          .split('T')[0];

      return eventDate === this.selectedDateRange;

    });

  }

  // Location (Timezone)

  if (this.selectedLocation) {

    result = result.filter(event =>
      event.timeZone
        ?.toLowerCase()
        .includes(
          this.selectedLocation.toLowerCase()
        )
    );

  }

  // Organizer

  if (this.selectedOrganizer) {

    result = result.filter(event =>
      event.yourRole ===
      this.selectedOrganizer
    );

  }

  // Free Events

  if (this.selectedCategory === 'Free Events') {

    result = result.filter(
      event => event.ticketingMode === 'Free'
    );

  }

  // This Weekend

  if (this.selectedCategory === 'This Weekend') {

    const today = new Date();

    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() + 7);

    result = result.filter(event => {

      const eventDate =
        new Date(event.dateUtc);

      return (
        eventDate >= today &&
        eventDate <= nextWeek
      );

    });

  }

  // This Month

  if (this.selectedCategory === 'This Month') {

    const now = new Date();

    result = result.filter(event => {

      const eventDate =
        new Date(event.dateUtc);

      return (
        eventDate.getMonth() ===
          now.getMonth() &&
        eventDate.getFullYear() ===
          now.getFullYear()
      );

    });

  }

  if (this.selectedCategory === 'Wishlist') {

    result = result.filter(
      event => event.favorite
    );

  }

  if (this.selectedCategory === 'Saved Events') {

    result = result.filter(
      event => event.saved
    );

  }
  if (this.sortBy === 'newest') {

  result.sort(
    (a, b) =>
      new Date(b.dateUtc).getTime() -
      new Date(a.dateUtc).getTime()
  );

}

if (this.sortBy === 'oldest') {

  result.sort(
    (a, b) =>
      new Date(a.dateUtc).getTime() -
      new Date(b.dateUtc).getTime()
  );

}

if (this.sortBy === 'name') {

  result.sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );

}

  this.filteredEvents = result;

  this.currentPage = 1;

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
