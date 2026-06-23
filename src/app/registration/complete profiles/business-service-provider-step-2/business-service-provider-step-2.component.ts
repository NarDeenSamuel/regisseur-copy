import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListingService } from '../../../core/services/addProjectsAndServices/listing-service.service';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-business-service-provider-step-2',
   imports: [NavbarComponent,CommonModule,FormsModule,RouterLink,SideBarComponent],
  templateUrl: './business-service-provider-step-2.component.html',
  styleUrl: './business-service-provider-step-2.component.css'
})
export class BusinessServiceProviderStep2Component  {
ngOnInit(): void {

  this.loadAllListings();

}
resetForms(): void {

  // Service

  this.serviceForm = {

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

  this.serviceImage = null;

  this.serviceImagePreview =
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200';


  // Product

  this.productForm = {

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

  this.productImages = [];

  this.productImagePreview =
    'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=1200';


  // Rental

  this.rentalForm = {

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

  this.rentalImages = [];

  this.rentalImagePreview =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200';

}
loadServices(): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.listingService
    .getTalentServices(user.id)
    .subscribe({

      next: (res: any[]) => {

  const services = res.map(item => ({

    id: item.id,

    image:
      item.coverImageUrl ||
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500',

    title:
      item.serviceName,

    description:
      item.shortDescription,

    type:
      'Service',

    typeClass:
      'service',

    category:
      item.serviceCategory,

    status:
      item.isDraft
        ? 'Draft'
        : 'Published',

    statusClass:
      item.isDraft
        ? 'draft'
        : 'active',

    location:
      item.coverageArea,

    notifications:
      true

  }));

  this.items = [
    ...this.items,
    ...services
  ];

  console.log(
    'SERVICES',
    this.items
  );

},

      error: err => {

        console.log(err);

      }

    });

}
  // =========================
  // LISTING MODAL
  // =========================
constructor(
  private listingService: ListingService
) {}

serviceImage: File | null = null;

serviceImagePreview =
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200';
productImagePreview =
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=1200';
rentalImagePreview =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200';




onProductImagesSelected(
  event: Event
): void {

  const input =
    event.target as HTMLInputElement;

  this.productImages =
    Array.from(
      input.files || []
    );

  if (this.productImages.length) {

    const reader =
      new FileReader();

    reader.onload = () => {

      this.productImagePreview =
        reader.result as string;

    };

    reader.readAsDataURL(
      this.productImages[0]
    );

  }

}
createProduct(
  isDraft: boolean = false
): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const selectedCategory =
    this.productCategories.find(
      x =>
        x.id ===
        this.productForm.categoryId
    );

  const payload = {

    userId:
      user.id,

    productName:
      this.productForm.productName || '',

    productCategory:
      selectedCategory?.name || '',

    shortDescription:
      this.productForm.description || '',

    availabilities: [

      {

        availableFrom:
          new Date().toISOString(),

        availableTo:
          new Date(
            Date.now() +
            24 * 60 * 60 * 1000
          ).toISOString()

      }

    ],

    productType:
      this.productForm.productType || '',

    pricingModel:
      this.productForm.pricingModel || '',

    price:
      Number(
        this.productForm.price
      ) || 0,

    fulfillmentMethod:
      this.productForm.fulfillmentMethod || '',

    inventoryStock:
      Number(
        this.productForm.stock
      ) || 0,

    skuCode:
      this.productForm.sku || '',

    requirementsNotes:
      this.productForm.notes || '',

    productImageUrl:
      this.productImagePreview,

    limitedStock:
      this.productForm.limitedStock,

    isDraft:
      isDraft

  };

  console.log(
    'PRODUCT PAYLOAD',
    payload
  );

  this.listingService
    .createTalentProduct(payload)
    .subscribe({

      next: (res: any) => {

        console.log(
          'PRODUCT CREATED',
          res
        );

this.loadAllListings();
        const modal =
          document.getElementById(
            'listingTypeModal'
          );

        if (modal) {

          const bsModal =
            (window as any)
              .bootstrap
              .Modal
              .getInstance(modal);

          bsModal?.hide();

        }
  this.resetForms();
      },

      error: (err: any) => {

        console.log(
          'PRODUCT ERROR',
          err
        );

      }

    });

}
loadProducts(): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.listingService
    .getTalentProducts(user.id)
    .subscribe({

      next: (res: any[]) => {

        const products = res.map(item => ({

          id:
            item.id,

          image:
            item.productImageUrl ||

            'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500',

          title:
            item.productName,

          description:
            item.shortDescription,

          type:
            'Product',

          typeClass:
            'product',

          category:
            item.productCategory,

          status:
            item.isDraft
              ? 'Draft'
              : 'Published',

          statusClass:
            item.isDraft
              ? 'draft'
              : 'active',

          location:
            item.fulfillmentMethod,

          notifications:
            true

        }));

        this.items = [
          ...this.items,
          ...products
        ];
console.log('PRODUCTS', this.items);
      },

      error: (err: any) => {

        console.log(err);

      }

    });

}
loadAllListings(): void {

  this.items = [];

  this.loadServices();

  this.loadProducts();

  this.loadRentals();

}
  onServiceImageSelected(
  event: Event
): void {

  const input =
    event.target as HTMLInputElement;

  if (input.files?.length) {

    this.serviceImage =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = () => {

      this.serviceImagePreview =
        reader.result as string;

    };

    reader.readAsDataURL(
      this.serviceImage
    );

  }

}
createService(
  isDraft: boolean = false
): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const selectedCategory =
    this.serviceCategories.find(
      x =>
        x.id ===
        this.serviceForm.categoryId
    );

  const selectedAvailability =
    this.availabilities.find(
      x =>
        x.id ===
        this.serviceForm.availabilityId
    );

  const payload = {

    userId:
      user.id,

    serviceName:
      this.serviceForm.serviceName || '',

    serviceCategory:
      selectedCategory?.name || '',

    shortDescription:
      this.serviceForm.description || '',

    coverageArea:
      this.serviceForm.coverageArea || '',

    availabilities: [

      {

        availableFrom:
          new Date().toISOString(),

        availableTo:
          new Date(
            Date.now() +
            24 * 60 * 60 * 1000
          ).toISOString()

      }

    ],

    serviceDelivery:
      this.serviceForm.deliveryType || '',

    pricingModel:
      this.serviceForm.pricingModel || '',

    price:
      Number(
        this.serviceForm.price
      ) || 0,

    duration:
      this.serviceForm.duration || '',

    requirementsNotes:
      this.serviceForm.notes || '',

    coverImageUrl:
      this.serviceImagePreview,

    acceptCustomRequests:
      this.serviceForm.acceptCustomRequests,

    isDraft:
      isDraft

  };

  console.log(
    'SERVICE PAYLOAD',
    payload
  );

  this.listingService
    .createTalentService(payload)
    .subscribe({

     next: (res: any) => {

  console.log(
    'SERVICE CREATED',
    res
  );

this.loadAllListings();
  const modal =
    document.getElementById(
      'listingTypeModal'
    );

  if (modal) {

    const bsModal =
      (window as any)
        .bootstrap
        .Modal
        .getInstance(modal);

    bsModal?.hide();

  }
  this.resetForms();
},

      error: (err: any) => {

        console.log(
          'SERVICE ERROR',
          err
        );

      }

    });

}
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

  // onServiceImageSelected(
  //   event: Event
  // ): void {

  //   const input =
  //     event.target as HTMLInputElement;

  //   if (input.files?.length) {

  //     this.serviceImage =
  //       input.files[0];

  //   }

  // }

  // createService(): void {

  //   const formData = new FormData();

  //   formData.append(
  //     'serviceName',
  //     this.serviceForm.serviceName
  //   );

  //   formData.append(
  //     'categoryId',
  //     String(this.serviceForm.categoryId)
  //   );

  //   formData.append(
  //     'description',
  //     this.serviceForm.description
  //   );

  //   formData.append(
  //     'pricingModel',
  //     this.serviceForm.pricingModel
  //   );

  //   formData.append(
  //     'price',
  //     String(this.serviceForm.price)
  //   );

  //   formData.append(
  //     'duration',
  //     this.serviceForm.duration
  //   );

  //   formData.append(
  //     'coverageArea',
  //     this.serviceForm.coverageArea
  //   );

  //   formData.append(
  //     'availabilityId',
  //     String(this.serviceForm.availabilityId)
  //   );

  //   formData.append(
  //     'deliveryType',
  //     this.serviceForm.deliveryType
  //   );

  //   formData.append(
  //     'notes',
  //     this.serviceForm.notes
  //   );

  //   formData.append(
  //     'acceptCustomRequests',
  //     String(
  //       this.serviceForm.acceptCustomRequests
  //     )
  //   );

  //   if (this.serviceImage) {

  //     formData.append(
  //       'coverImage',
  //       this.serviceImage
  //     );

  //   }

  //   console.log(formData);

  // }

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

  // onProductImagesSelected(
  //   event: Event
  // ): void {

  //   const input =
  //     event.target as HTMLInputElement;

  //   this.productImages =
  //     Array.from(
  //       input.files || []
  //     );

  // }



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

  if (this.rentalImages.length) {

    const reader =
      new FileReader();

    reader.onload = () => {

      this.rentalImagePreview =
        reader.result as string;

    };

    reader.readAsDataURL(
      this.rentalImages[0]
    );

  }

}
 createRental(
  isDraft: boolean = false
): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const selectedCategory =
    this.rentalCategories.find(
      x =>
        x.id ===
        this.rentalForm.categoryId
    );

  const payload = {

    userId:
      user.id,

    rentalName:
      this.rentalForm.rentalName || '',

    rentalCategory:
      selectedCategory?.name || '',

    shortDescription:
      this.rentalForm.description || '',

    availabilities: [

      {

        availableFrom:
          new Date().toISOString(),

        availableTo:
          new Date(
            Date.now() +
            24 * 60 * 60 * 1000
          ).toISOString()

      }

    ],

    rentalType:
      this.rentalForm.rentalType || '',

    pricingModel:
      this.rentalForm.pricingModel || '',

    rentalPrice:
      Number(
        this.rentalForm.price
      ) || 0,

    rentalDuration:
      this.rentalForm.minDuration || '',

    fulfillmentMethod:
      this.rentalForm.pickupDelivery || '',

    requirementsNotes:
      this.rentalForm.notes || '',

    coverImageUrl:
      this.rentalImagePreview,

    requiresDeposit:
      this.rentalForm.securityDeposit,

    isDraft:
      isDraft

  };

  console.log(
    'RENTAL PAYLOAD',
    payload
  );

  this.listingService
    .createTalentRental(payload)
    .subscribe({

      next: (res: any) => {

        console.log(
          'RENTAL CREATED',
          res
        );

        this.loadAllListings();

        const modal =
          document.getElementById(
            'listingTypeModal'
          );

        if (modal) {

          const bsModal =
            (window as any)
              .bootstrap
              .Modal
              .getInstance(modal);

          bsModal?.hide();

        }
          this.resetForms();

      },

      error: (err: any) => {

        console.log(
          'RENTAL ERROR',
          err
        );

      }

    });

}
loadRentals(): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.listingService
    .getTalentRentals(user.id)
    .subscribe({

      next: (res: any[]) => {

        const rentals = res.map(item => ({

          id:
            item.id,

          image:
            item.coverImageUrl ||

            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',

          title:
            item.rentalName,

          description:
            item.shortDescription,

          type:
            'Rental',

          typeClass:
            'rental',

          category:
            item.rentalCategory,

          status:
            item.isDraft
              ? 'Draft'
              : 'Published',

          statusClass:
            item.isDraft
              ? 'draft'
              : 'active',

          location:
            item.fulfillmentMethod,

          notifications:
            true

        }));

        this.items = [
          ...this.items,
          ...rentals
        ];
console.log('RENTALS', this.items);
      },

      error: err => {

        console.log(err);

      }

    });

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
  'Service',
  'Product',
  'Rental'
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
      .toLowerCase()
      .trim();

  result = result.filter(
    item =>

      item.title
        ?.toLowerCase()
        .includes(search)

      ||

      item.category
        ?.toLowerCase()
        .includes(search)

      ||

      item.type
        ?.toLowerCase()
        .includes(search)

      ||

      item.description
        ?.toLowerCase()
        .includes(search)

  );

}

   if (
  this.selectedCategory
) {

  result = result.filter(
    item =>
      item.type ===
      this.selectedCategory
  );

}

   if (
  this.selectedSort ===
  'Newest'
) {

  result =
    [...result].reverse();

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
