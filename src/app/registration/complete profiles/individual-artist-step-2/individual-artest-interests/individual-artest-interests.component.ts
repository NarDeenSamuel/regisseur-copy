import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { SideBarComponent } from '../../../../side-bar/side-bar.component';

@Component({
  selector: 'app-individual-artest-interests',
   imports: [NavbarComponent,CommonModule,FormsModule,RouterLink,SideBarComponent],
  templateUrl: './individual-artest-interests.component.html',
  styleUrl: './individual-artest-interests.component.css'
})
export class IndividualArtestInterestsComponent {

  // =========================
  // LISTING MODAL
  // =========================

  topMatch: any = null;

  selectedListingType:
    'service' | 'product' | 'rental' = 'service';

  listingStep = 1;

  continueListing(): void {

    this.listingStep = 2;

  }

  backToSelection(): void {

    this.listingStep = 1;

  }

  submitListing(): void {

    switch (this.selectedListingType) {

      case 'service':
        this.createService();
        break;

      case 'product':
        this.createProduct();
        break;

      case 'rental':
        this.createRental();
        break;

    }

  }

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
  serviceImage: File | null = null;

  serviceForm = {
    serviceName: '',
    categoryId: null,
    description: '',
    pricingModel: 'fixed',
    price: null,
    duration: '',
    coverageArea: '',
    availabilityId: null,
    deliveryType: 'onsite',
    notes: '',
    acceptCustomRequests: false,
    coverImage: null
  };

  onServiceImageSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files?.length) {

      this.serviceImage =
        input.files[0];

    }

  }

  createService(): void {

    const formData = new FormData();

    formData.append(
      'serviceName',
      this.serviceForm.serviceName
    );

    formData.append(
      'categoryId',
      String(this.serviceForm.categoryId)
    );

    formData.append(
      'description',
      this.serviceForm.description
    );

    formData.append(
      'pricingModel',
      this.serviceForm.pricingModel
    );

    formData.append(
      'price',
      String(this.serviceForm.price)
    );

    formData.append(
      'duration',
      this.serviceForm.duration
    );

    formData.append(
      'coverageArea',
      this.serviceForm.coverageArea
    );

    formData.append(
      'availabilityId',
      String(this.serviceForm.availabilityId)
    );

    formData.append(
      'deliveryType',
      this.serviceForm.deliveryType
    );

    formData.append(
      'notes',
      this.serviceForm.notes
    );

    formData.append(
      'acceptCustomRequests',
      String(
        this.serviceForm.acceptCustomRequests
      )
    );

    if (this.serviceImage) {

      formData.append(
        'coverImage',
        this.serviceImage
      );

    }

    console.log(formData);

  }

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

  productForm = {
    productName: '',
    categoryId: null,
    description: '',
    pricingModel: 'fixed',
    price: null,
    stock: null,
    sku: '',
    productType: 'physical',
    fulfillmentMethod: '',
    leadTime: '',
    notes: '',
    limitedStock: false
  };

  onProductImagesSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    this.productImages =
      Array.from(
        input.files || []
      );

  }

  createProduct(): void {

    const formData = new FormData();

    Object.entries(
      this.productForm
    ).forEach(([key, value]) => {

      formData.append(
        key,
        String(value ?? '')
      );

    });

    this.productImages.forEach(file => {

      formData.append(
        'images',
        file
      );

    });

    console.log(formData);

  }

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

  rentalForm = {
    rentalName: '',
    categoryId: null,
    description: '',
    pricingModel: 'hour',
    price: null,
    minDuration: '',
    rentalType: 'equipment',
    availabilityId: null,
    pickupDelivery: 'pickup',
    notes: '',
    securityDeposit: false
  };

  onRentalImagesSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    this.rentalImages =
      Array.from(
        input.files || []
      );

  }

  createRental(): void {

    const formData = new FormData();

    Object.entries(
      this.rentalForm
    ).forEach(([key, value]) => {

      formData.append(
        key,
        String(value ?? '')
      );

    });

    this.rentalImages.forEach(file => {

      formData.append(
        'images',
        file
      );

    });

    console.log(formData);

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
