import {countries} from '../../../../shared/countries';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../navbar/navbar.component';
import { SideBarComponent } from '../../../../side-bar/side-bar.component';
@Component({
  selector: 'app-individual-artest-spaces',
   imports: [NavbarComponent,CommonModule,FormsModule,RouterLink,SideBarComponent],
  templateUrl: './individual-artest-spaces.component.html',
  styleUrl: './individual-artest-spaces.component.css'
})
export class IndividualArtestSpacesComponent implements OnInit {
ngOnInit(): void {

  this.selectedCountry = this.countries[0];

}
  // =========================
  // LISTING MODAL
  // =========================

  topMatch: any = null;
validationMessage = '';
sendInvitation(): void {

  this.validationMessage = '';

  if (
    !this.spaceInvitationForm.email ||
    !this.spaceInvitationForm.phone ||
    !this.spaceInvitationForm.country ||
    !this.spaceInvitationForm.city ||
    !this.spaceInvitationForm.primaryCategory
  ) {

    this.validationMessage =
      'Please fill in all required fields.';

    return;

  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(
      this.spaceInvitationForm.email
    )
  ) {

    this.validationMessage =
      'Please enter a valid email address.';

    return;

  }

  const payload = {

    accountType:
      this.selectedAccountType,

    email:
      this.spaceInvitationForm.email,

    phone:
      `${this.selectedCountry.code}${this.spaceInvitationForm.phone}`,

    country:
      this.spaceInvitationForm.country,

    city:
      this.spaceInvitationForm.city,

    primaryCategory:
      this.spaceInvitationForm.primaryCategory,

    secondaryCategory:
      this.spaceInvitationForm.secondaryCategory

  };

  console.log(payload);

  this.spaceModalStep = 2;

}
countryList = countries;

cities: string[] = [];
countriesList = countries;


onCountryChange(): void {

  const selectedCountry =
    this.countriesList.find(
      c => c.name === this.spaceInvitationForm.country
    );

  this.cities =
    selectedCountry?.states || [];

  this.spaceInvitationForm.city = '';

}
  // continueListing(): void {

  //   this.listingStep = 2;

  // }

  // backToSelection(): void {

  //   this.listingStep = 1;

  // }



  // =========================
  // SERVICE
  // =========================

serviceCategories = [
  {
    id: 1,
    name: 'Performance'
  },
  {
    id: 2,
    name: 'Production'
  },
  {
    id: 3,
    name: 'Photography'
  },
  {
    id: 4,
    name: 'Planning'
  }
];




  // =========================
  // PRODUCT
  // =========================

  productImages: File[] = [];

  productCategories = [
    {
      id: 1,
      name: 'Merchandise'
    },
    {
      id: 2,
      name: 'Equipment'
    },
    {
      id: 3,
      name: 'Digital Product'
    },
    {
      id: 4,
      name: 'Accessories'
    }
  ];





  // =========================
  // RENTAL
  // =========================

  rentalImages: File[] = [];

  rentalCategories = [
    {
      id: 1,
      name: 'Audio Equipment'
    },
    {
      id: 2,
      name: 'Lighting Equipment'
    },
    {
      id: 3,
      name: 'Stage Equipment'
    }
  ];


// =========================
// SPACE INVITATION MODAL
// =========================

spaceModalStep = 1;

selectedAccountType:
  'business' | 'organization' = 'business';

showCountryDropdown = false;

selectedCountry = {
  name: 'United States',
  code: '+1',
  flag: 'assets/images/flags/us.png'
};

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



primaryCategories = [
  'Venue',
  'Studio',
  'Theater',
  'Conference Hall',
  'Outdoor Space'
];

secondaryCategories = [
  'Music',
  'Art',
  'Events',
  'Production'
];

spaceInvitationForm = {
  email: '',
  phone: '',
  country: '',
  city: '',
  primaryCategory: '',
  secondaryCategory: ''
};

selectCountry(country: any): void {

  this.selectedCountry = country;

  this.showCountryDropdown = false;

}

// sendInvitation(): void {

//   const payload = {

//     accountType:
//       this.selectedAccountType,

//     email:
//       this.spaceInvitationForm.email,

//     phone:
//       `${this.selectedCountry.code}${this.spaceInvitationForm.phone}`,

//     country:
//       this.spaceInvitationForm.country,

//     city:
//       this.spaceInvitationForm.city,

//     primaryCategory:
//       this.spaceInvitationForm.primaryCategory,

//     secondaryCategory:
//       this.spaceInvitationForm.secondaryCategory

//   };

//   console.log(payload);

//   this.spaceModalStep = 2;

// }

resetSpaceModal(): void {

  this.spaceModalStep = 1;

}

  // =========================
  // SHARED DATA
  // =========================

  availabilities = [
    {
      id: 1,
      name: 'Always Available'
    },
    {
      id: 2,
      name: 'Weekends Only'
    },
    {
      id: 3,
      name: 'Custom Schedule'
    }
  ];

  // =========================
  // FILTERS
  // =========================

  filters = [
    'All',
    'Interests',
    'Saved',
    'Following',
    'Alerts'
  ];

  activeFilter = 'All';

  selectedCategory = '';

  selectedSort = 'Newest';

  searchTerm = '';

  categoryOptions = [
    'Events',
    'Artists',
    'Venues',
    'Services',
    'Products'
  ];

  // =========================
  // MENU
  // =========================

  openedMenu: number | null = null;

  toggleMenu(
    index: number
  ): void {

    this.openedMenu =
      this.openedMenu === index
        ? null
        : index;

  }

  // =========================
  // DATA
  // =========================

  items: any[] = [];

  // =========================
  // FILTERED DATA
  // =========================

  get filteredItems(): any[] {

    let result = [...this.items];

    if (this.activeFilter !== 'All') {

      result = result.filter(
        item =>
          item.type?.toLowerCase() ===
          this.activeFilter
            .toLowerCase()
            .slice(0, -1)
      );

    }

    if (
      this.searchTerm.trim()
    ) {

      const search =
        this.searchTerm
          .toLowerCase();

      result = result.filter(
        item =>
          item.title
            ?.toLowerCase()
            .includes(search)
      );

    }

    if (
      this.selectedCategory
    ) {

      result = result.filter(
        item =>
          item.category ===
          this.selectedCategory
      );

    }

    if (
      this.selectedSort ===
      'Newest'
    ) {

      result =
        result.reverse();

    }

    return result;

  }

  // =========================
  // PAGINATION
  // =========================

  currentPage = 1;

  itemsPerPage = 20;

  get totalPagesCount(): number {

    return (
      Math.ceil(
        this.filteredItems.length /
        this.itemsPerPage
      ) || 1
    );

  }

  get paginatedItems(): any[] {

    const start =
      (
        this.currentPage - 1
      ) *
      this.itemsPerPage;

    return this.filteredItems.slice(
      start,
      start +
      this.itemsPerPage
    );

  }

  setFilter(
    filter: string
  ): void {

    this.activeFilter =
      filter;

    this.currentPage = 1;

  }

  applyFilters(): void {

    this.currentPage = 1;

  }

  changePage(
    page: number
  ): void {

    this.currentPage = page;

  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPagesCount
    ) {

      this.currentPage++;

    }

  }

  prevPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

    }

  }

  changeItemsPerPage(): void {

    this.currentPage = 1;

  }

  get visiblePages():
    (number | string)[] {

    const total =
      this.totalPagesCount;

    const current =
      this.currentPage;

    if (total <= 5) {

      return Array.from(
        { length: total },
        (_, i) => i + 1
      );

    }

    if (current <= 3) {

      return [
        1,
        2,
        3,
        4,
        '...',
        total
      ];

    }

    if (
      current >= total - 2
    ) {

      return [
        1,
        '...',
        total - 3,
        total - 2,
        total - 1,
        total
      ];

    }

    return [
      1,
      '...',
      current - 1,
      current,
      current + 1,
      '...',
      total
    ];

  }

}
