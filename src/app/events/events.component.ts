import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../core/services/event/event-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-events',
  imports: [SideBarComponent, NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
activeTab = 'overview';
eventForm!: FormGroup;
isLoading = false;

errorMessage = '';
owners: any[] = [];


loadOwners(): void {

  this.eventService
    .getProducers()
    .subscribe({

      next: (producers: any[]) => {

        const producerList = producers.map(x => ({
          userId: x.id,
          name: x.name,
          type: 'Producer'
        }));

        this.eventService
          .getOrganizers()
          .subscribe({

            next: (organizers: any[]) => {

              const organizerList = organizers.map(x => ({
                userId: x.id,
                name: x.name,
                type: 'Organizer'
              }));

              this.owners = [
  ...producerList,
  ...organizerList
].sort((a, b) =>
  a.name.localeCompare(b.name)
);

this.groupOwners();

console.log('owners', this.owners);
console.log('groupedOwners', this.groupedOwners);
            }

          });

      }

    });

}

groupedOwners: any[] = [];
groupOwners(): void {

  const groups: any = {};

  this.owners.forEach(owner => {

    const letter =
      owner.name.charAt(0).toUpperCase();

    if (!groups[letter]) {

      groups[letter] = [];

    }

    groups[letter].push(owner);

  });

  this.groupedOwners =
    Object.keys(groups)
      .sort()
      .map(letter => ({
        letter,
        owners: groups[letter]
      }));

}
tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'fa-solid fa-chart-column'
  },
  {
    id: 'events',
    label: 'All Events',
    icon: 'fa-regular fa-calendar'
  },
  {
    id: 'orders',
    label: 'Ticket Purchase Orders',
    icon: 'fa-solid fa-cart-shopping'
  },
  {
    id: 'tickets',
    label: 'Tickets & Passes',
    icon: 'fa-solid fa-ticket'
  },
  {
    id: 'refunds',
    label: 'Refunds & Adjustments',
    icon: 'fa-solid fa-arrow-rotate-left'
  },
  {
    id: 'guests',
    label: 'Guest Lists',
    icon: 'fa-solid fa-users'
  },
  {
    id: 'rsvp',
    label: 'RSVP & Invitations',
    icon: 'fa-regular fa-envelope'
  },
  {
    id: 'checkin',
    label: 'Check-In & Access',
    icon: 'fa-solid fa-qrcode'
  },
  {
    id: 'seating',
    label: 'Seating / Zones',
    icon: 'fa-solid fa-door-open'
  },
  {
    id: 'communication',
    label: 'Guest Communication',
    icon: 'fa-regular fa-message'
  },
  {
    id: 'reports',
    label: 'Reports & Activity',
    icon: 'fa-solid fa-chart-pie'
  }
];



events: any[] = [];

getStatusClass(status: string): string {

  switch (status) {

    case 'Published':
      return 'status-success';

    case 'Submitted':
      return 'status-warning';

    case 'Draft':
      return 'status-secondary';

    default:
      return 'status-secondary';

  }

}
getProgress(event: any): number {
  return (event.sold / event.total) * 100;
}



todayCheckIn: any = null;

pendingActions: any = null;

recentActivities: any[] = [];


currentStep = 1;

nextStep() {

  this.showValidationMessage = false;

  if (this.currentStep === 1 && !this.isStep1Valid()) {

    this.showValidationMessage = true;
    return;

  }

  if (this.currentStep === 2 && !this.isStep2Valid()) {

    this.showValidationMessage = true;
    return;

  }

  this.currentStep++;

}

prevStep() {

  if (this.currentStep > 1) {

    this.currentStep--;

  }

}

showValidationMessage = false;

constructor(
  private fb: FormBuilder,
    private eventService: EventService

) {}

ngOnInit(): void {
  this.loadOwners();

this.eventForm = this.fb.group({

  // STEP 1
  eventName: ['', Validators.required],
  eventType: ['', Validators.required],
  hostingSpace: ['', Validators.required],
  organizer: ['', Validators.required],

  startDate: ['', Validators.required],
  startTime: ['', Validators.required],

  endDate: ['', Validators.required],
  endTime: ['', Validators.required],

  timeZone: ['Eastern Time (ET)'],

  format: [],
  accessType: ['Paid Ticketed'],
  visibility: ['Public'],

  description: [''],

  enableGuestCheckIn: [true],
  enableSeatingZones: [false],
  allowRefunds: [true],

  // STEP 2 - Ticketing
  ticketingMode: [],
  currency: ['USD'],

  salesStartDate: [''],
  salesEndDate: [''],

  capacity: [0],

  allowPromoCodes: [false],

  // Ticket Types
  ticketTypes: this.fb.array([]),

  // Purchase Orders & Buyer Rules
  collectOrders: [true],

  allowMultipleGuests: [true],

  requireAttendeeNames: [true],

  ticketsPerOrder: [6],

  sendConfirmation: [true],

  allowTransfer: [true],

  // Refunds
  refundPolicy: ['Refund allowed until 48 hours before event'],

  fullRefund: [true],

  partialRefund: [true],

  manualApproval: [true],

  chargebackFlag: [true],

  // Access Cards
  accessMethods: [[]],

  // Guest Information Collection
  collectFullName: [true],

  collectEmail: [true],

  collectPhone: [true],

  collectCompany: [false],

  collectAccessibilityNotes: [false],

  allowPlusOne: [false],

  enableWaitlist: [false],

  // STEP 3
  publishNow: [true],

  openSalesImmediately: [true],

  showOnProfile: [true],

  notifyFollowers: [false],

  requireConfirmation: [true],
eventCover: [null]
});

const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const userId = user.id;

  if (userId) {
    this.loadMyEvents(userId);
  }


}
loadMyEvents(userId: number) {

  this.eventService
    .getMyCreatedEvents(userId)
    .subscribe({

      next: (res) => {

        console.log('MY EVENTS', res);

        this.events = res;
      },

      error: (err) => {
        console.error(err);
      }

    });

}

get ticketTypes(): FormArray {

  return this.eventForm.get(
    'ticketTypes'
  ) as FormArray;

}

private buildUtcDate(
  date: string,
  time: string
): string {

  const localDate = new Date(
    `${date}T${time}`
  );

  return localDate.toISOString();

}

eventTypes = [
  { id: 1, name: 'PERFORMANCE' },
  { id: 2, name: 'FESTIVAL' },
  { id: 3, name: 'CONFERENCE' },
  { id: 4, name: 'EDUCATIONAL' },
  { id: 5, name: 'EXHIBITION' },
  { id: 6, name: 'COMPETITION' },
  { id: 7, name: 'SOCIAL GATHERING' },
  { id: 8, name: 'CEREMONY' },
  { id: 9, name: 'SCREENING / BROADCAST' },
  { id: 10, name: 'EXPERIENCE' },
  { id: 11, name: 'LAUNCH' },
  { id: 12, name: 'DIGITAL / DELIVERY FORMAT' }
];

hostingSpaces = [
  'Main Hall',
  'Arena',
  'Conference Room'
];

organizers = [
  'Business Account',
  'Organization Account',
  'Team Account'
];

timeZones = [
  'Eastern Time (ET)',
  'Central Time (CT)',
  'Pacific Time (PT)'
];
eventFormats = [
  { id: 1, name: 'In Person' },
  { id: 2, name: 'Virtual' },
  { id: 3, name: 'Hybrid' }
];
accessTypes = [
  { id: 1, name: 'Free RSVP' },
  { id: 2, name: 'Paid Ticketed' },
  { id: 3, name: 'Invite Only' },
  { id: 4, name: 'Guest List / Door List' }
];

visibilityTypes = [
  { id: 1, name: 'Public' },
  { id: 2, name: 'Private' },
  { id: 3, name: 'Unlisted' }
];
ticketModes = [
  { id: 1, name: 'Free Event' },
  { id: 2, name: 'Paid Tickets' },
  { id: 3, name: 'Mixed Access' }
];

currencies = [
  'USD', // US Dollar
  'EUR', // Euro
  'GBP', // British Pound
  'EGP', // Egyptian Pound
  'SAR', // Saudi Riyal
  'AED', // UAE Dirham
  'QAR', // Qatari Riyal
  'KWD', // Kuwaiti Dinar
  'BHD', // Bahraini Dinar
  'OMR', // Omani Rial
  'JOD', // Jordanian Dinar
  'IQD', // Iraqi Dinar
  'MAD', // Moroccan Dirham
  'TND', // Tunisian Dinar
  'DZD', // Algerian Dinar
  'TRY', // Turkish Lira
  'CHF', // Swiss Franc
  'CAD', // Canadian Dollar
  'AUD', // Australian Dollar
  'NZD', // New Zealand Dollar
  'JPY', // Japanese Yen
  'CNY', // Chinese Yuan
  'HKD', // Hong Kong Dollar
  'SGD', // Singapore Dollar
  'INR', // Indian Rupee
  'PKR', // Pakistani Rupee
  'BDT', // Bangladeshi Taka
  'KRW', // South Korean Won
  'ZAR', // South African Rand
  'BRL', // Brazilian Real
  'MXN', // Mexican Peso
  'RUB'  // Russian Ruble
];

refundPolicies = [
  'No Refund',
  'Refund allowed until 48 hours before event',
  'Refund allowed until 24 hours before event',
  'Full Refund'
];

accessMethods = [
  'RSVP',
  'Guest List / Door List',
  'QR Ticket Check-In',
  'Invite Only'
];

removeTicketType(index: number): void {

  this.ticketTypes.removeAt(index);

}
editTicket(index: number): void {

  this.ticketTypes.at(index)
    .patchValue({
      isEditing: true
    });

}
saveTicket(index: number): void {

  this.ticketTypes.at(index)
    .patchValue({
      isEditing: false
    });

}

addTicketType(): void {

  this.ticketTypes.push(

    this.fb.group({

      name: [''],
      price: [0],
      quantity: [0],
    salesStartDate: [''],
  salesEndDate: [''],
      refundable: [true],
      visibility: ['Public'],
      isEditing: [true]

    })

  );

}
getTicketFormGroup(index: number): FormGroup {
  return this.ticketTypes.at(index) as FormGroup;
}
accessOptions = [
  {
    label: 'RSVP',
    icon: 'fa-regular fa-envelope',
    value: 'RSVP'
  },
  {
    label: 'Guest List / Door List',
    icon: 'fa-solid fa-list',
    value: 'Guest List'
  },
  {
    label: 'QR Ticket Check-In',
    icon: 'fa-solid fa-qrcode',
    value: 'QR Checkin'
  },
  {
    label: 'Invite Only',
    icon: 'fa-solid fa-lock',
    value: 'Invite Only'
  }
];
toggleAccess(option: string): void {

  const current =
    this.eventForm.get('accessMethods')?.value || [];

  if (current.includes(option)) {

    this.eventForm.patchValue({
      accessMethods: current.filter(
        (x: string) => x !== option
      )
    });

  } else {

    this.eventForm.patchValue({
      accessMethods: [...current, option]
    });

  }

}

isAccessSelected(option: string): boolean {

  const current =
    this.eventForm.get('accessMethods')?.value || [];

  return current.includes(option);

}
coverPreview: string | ArrayBuffer | null = null;
onCoverSelected(event: any): void {

  const file = event.target.files[0];

  if (!file) return;

  this.eventForm.patchValue({
    eventCover: file
  });

  const reader = new FileReader();

  reader.onload = () => {

    this.coverPreview = reader.result;

  };

  reader.readAsDataURL(file);

}

isStep1Valid(): boolean {

  return !!(

    this.eventForm.get('eventName')?.value &&
    this.eventForm.get('eventType')?.value &&
    this.eventForm.get('hostingSpace')?.value &&
    this.eventForm.get('organizer')?.value &&
    this.eventForm.get('startDate')?.value &&
    this.eventForm.get('startTime')?.value &&
    this.eventForm.get('endDate')?.value &&
    this.eventForm.get('endTime')?.value &&
    this.eventForm.get('timeZone')?.value &&
    this.eventForm.get('description')?.value

  );

}
isStep2Valid(): boolean {

  if (this.ticketTypes.length === 0) {

    return false;

  }

  const ticketsValid =
    this.ticketTypes.controls.every(ticket => {

      return (

        ticket.get('name')?.value?.trim() &&

        Number(
          ticket.get('price')?.value
        ) > 0 &&

        Number(
          ticket.get('quantity')?.value
        ) > 0 &&

        ticket.get('salesStartDate')?.value &&

        ticket.get('salesEndDate')?.value

      );

    });

  return (

    !!this.eventForm.get('currency')?.value &&

    Number(
      this.eventForm.get('capacity')?.value
    ) > 0 &&

    !!this.eventForm.get('salesStartDate')?.value &&

    !!this.eventForm.get('salesEndDate')?.value &&

    ticketsValid

  );

}

publishEvent(): void {

  this.errorMessage = '';

  this.isLoading = true;
 const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const yourRole =
    user?.primaryRoleName === 'Producer'
      ? 1
      : user?.primaryRoleName === 'Organizer'
      ? 2
      : null;
      const userId = user.id;
  const form = this.eventForm.value;

  const selectedOwner = form.organizer;

  console.log('SELECTED OWNER');
  console.log(selectedOwner);

  const payload = {

    name: form.eventName,
userId:userId,
    description: form.description,

    dateUtc: this.buildUtcDate(
      form.startDate,
      form.startTime
    ),

    endDateUtc: this.buildUtcDate(
      form.endDate,
      form.endTime
    ),

    timeZone: form.timeZone,

    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

    format:
      Number(form.format),

    accessType:
      Number(form.accessType),

    visibility:
      Number(form.visibility),

    currency:
      form.currency,

    ticketingMode:
      Number(form.ticketingMode),

    ticketSalesStartUtc:
      new Date(
        form.salesStartDate
      ).toISOString(),

    ticketSalesEndUtc:
      new Date(
        form.salesEndDate
      ).toISOString(),

    allowDiscountCodes:
      form.allowPromoCodes,

    enableGuestCheckIn:
      form.enableCheckin,

    enableSeatingZones:
      form.enableSeating,

    maxCapacity:
      Number(form.capacity),

    yourRole: yourRole,

    categoryId: 1,

    eventTypeId:
      Number(form.eventType),

    locationId: null,

    bookingType: 1,

    sectionIds: [],

    producerId:
      selectedOwner?.type === 'Producer'
        ? selectedOwner.userId
        : null,

    assistantId: null,

    organizerId:
      selectedOwner?.type === 'Organizer'
        ? selectedOwner.userId
        : null,

    organizerAssistantId: null,

    promoterId: null,

    promoterAssistantId: null,

    ticketHostId:
      null,

    hostAssistantId: null,

    vendorId: null,

    vendorAssistantId: null,

    serviceProviderId: null,

    serviceProviderAssistantId: null,

    performerIds: [],

    securityId: null,

    securityAssistantId: null,

    volunteerIds: [],

    sponsorIds: [],

    programs: [],

    policy: {

      allowRefundRequests:
        form.allowRefunds,

      allowFullRefund:
        form.fullRefund,

      allowPartialRefund:
        form.partialRefund,

      maxRefundPercentage: 100,

      requireManualApproval:
        form.manualApproval,

      enableChargebackDispute:
        form.chargebackFlag,

      refundAllowedHoursBeforeEvent: 48,

      refundPolicyText:
        form.refundPolicy,

      termsAndConditions: ''

    },

    purchaseSettings: {

      collectPurchaseOrders:
        form.collectOrders,

      allowMultipleGuests:
        form.allowMultipleGuests,

      requireAttendeeNames:
        form.requireAttendeeNames,

      maxTicketsPerOrder:
        Number(form.ticketsPerOrder),

      autoSendConfirmation:
        form.sendConfirmation,

      allowTicketTransfer:
        form.allowTransfer

    },

    guestSettings: {

      requireFullName:
        form.collectFullName,

      requireEmail:
        form.collectEmail,

      requirePhoneNumber:
        form.collectPhone,

      requireCompany:
        form.collectCompany,

      requireAccessibilityNotes:
        form.collectAccessibilityNotes,

      allowPlusOne:
        form.allowPlusOne,

      enableWaitlist:
        form.enableWaitlist

    },

    guestAccessMethods:
      (form.accessMethods || []).map(
        (x: string) => {

          switch (x) {

            case 'RSVP':
              return 1;

            case 'Guest List':
              return 2;

            case 'QR Checkin':
              return 3;

            case 'Invite Only':
              return 4;

            default:
              return 0;

          }

        }
      ),

    ticketTiers:
      this.ticketTypes.value.map(
        (ticket: any) => ({

          name: ticket.name,

          price:
            Number(ticket.price),

          quantity:
            Number(ticket.quantity),

          saleStartUtc:
            new Date(
              ticket.salesStartDate
            ).toISOString(),

          saleEndUtc:
            new Date(
              ticket.salesEndDate
            ).toISOString(),

          isRefundable:
            ticket.refundable,

          visibility: 1,

          description: ''

        })
      )

  };

  console.log('EVENT PAYLOAD');
  console.log(payload);

  this.eventService
    .createEvent(payload)
    .subscribe({

    next: (res) => {

  this.isLoading = false;

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  if (user.id) {
    this.loadMyEvents(user.id);
  }

  this.publishedEvent =
    this.eventForm.getRawValue();

  const createModal =
    bootstrap.Modal.getInstance(
      document.getElementById('createEventModal')
    );

  createModal?.hide();

  const successModal =
    new bootstrap.Modal(
      document.getElementById(
        'eventPublishedModal'
      )
    );

  successModal.show();

},

      error: (err) => {

        this.isLoading = false;

        console.log(
          'FULL ERROR',
          err
        );

        console.log(
          'BACKEND ERRORS',
          err?.error
        );

        if (typeof err?.error === 'string') {

          this.errorMessage =
            err.error;

        } else if (
          err?.error?.errors
        ) {

          this.errorMessage =
            Object.values(
              err.error.errors
            ).flat().join(' - ');

        } else {

          this.errorMessage =
            'Failed to create event';

        }

      }

    });

}
resetEventForm() {

  this.eventForm.reset();

  this.ticketTypes.clear();

  this.currentStep = 1;

}
publishedEvent: any;










}
