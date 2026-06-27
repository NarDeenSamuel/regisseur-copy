import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  LocationStepperComponent
} from '../../components/location-stepper/location-stepper.component';

import {
  LocationSpaceInfoComponent
} from '../../components/location-space-info/location-space-info.component';

import {
  LocationMediaComponent
} from '../../components/location-media/location-media.component';

import {
  LocationAmenitiesComponent
} from '../../components/location-amenities/location-amenities.component';

import {
  LocationPhysicalInfoComponent
} from '../../components/location-physical-info/location-physical-info.component';

import {
  LocationFoodBeverageComponent
} from '../../components/location-food-beverage/location-food-beverage.component';

import {
  LocationSectionsComponent
} from '../../components/location-sections/location-sections.component';

import {
  LocationRulesComponent
} from '../../components/location-rules/location-rules.component';

import {
  LocationService
} from '../../services/location.service';
import { AmenityCategory } from '../../models/amenity-category';

@Component({

  selector: 'app-update-location',

  standalone: true,

  imports: [

    LocationStepperComponent,

    LocationSpaceInfoComponent,

    LocationMediaComponent,

    LocationAmenitiesComponent,

    LocationPhysicalInfoComponent,

    LocationFoodBeverageComponent,

    LocationSectionsComponent,

    LocationRulesComponent

  ],

  templateUrl:
    './update-location.component.html',

  styleUrl:
    './update-location.component.css'

})
export class UpdateLocationComponent
implements OnInit {

  /* =========================
     INJECTION
  ========================== */

  private fb =
    inject(FormBuilder);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  private locationService =
    inject(LocationService);

  /* =========================
     STATE
  ========================== */

  currentStep = 0;

  locationId = 0;

  isSubmitting = false;
  amenityCategories:
  AmenityCategory[] = [];


  /* =========================
     FORM
  ========================== */

  form = this.fb.group({

    name: [''],

    description: [''],

    imageUrl: [''],

    phone: [''],

    website: [''],

    email: [''],

   foodMenuUrl: [''],
beverageMenuUrl: [''],

    fullEquippedBar: [false],

    byoDrinksAllowed: [false],

    fullKitchen: [false],

    byoFoodAllowed: [false],

    cuisineTypes: [''],

    neighborhood: [''],

    building: [''],

    street: [''],

    floor: [''],

    unit: [''],

    city: [''],

    state: [''],

    zipCode: [''],

    locationCategoryId: [1],

    pricePerHour: [0],

    totalCapacity: [0],

    indoorFlag: [false],

    outdoorFlag: [false],

    numberOfRooms: [0],

    roomsListJson: [''],

    numberOfTables: [0],

    numberOfSeats: [0],

    squareFootage: [0],

    privateAreaFlag: [false],

    checkInEnabled: [false],

    cleaningPolicyType: [''],

    cancellationPolicyType: [''],

    accessNotes: [''],

    noSmoking: [false],

    noOutsideAlcohol: [false],

    noLoudMusic: [false],

    cateringAllowed: [false],

    petFriendly: [false],

    allAgesWelcome: [false],

    additionalHouseRules: [''],

    numberOfBathrooms: [0],

    accessibilityFriendly: [false],

    securityPersonnelAvailable: [false],

    cctv24_7: [false],

    amenities: this.fb.array([]),

    usageTypes: this.fb.array([]),

    workingHours: this.fb.array([]),

    media: this.fb.array([]),

    sections: this.fb.array([])

  });

  /* =========================
     LIFECYCLE
  ========================== */

 ngOnInit(): void {

  this.locationId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadAmenities();
}
  loadAmenities(): void {

  this.locationService
    .getAmenities()
    .subscribe({

      next: (res) => {

        this.amenityCategories = res;

        this.getLocation();

      }

    });

}

  /* =========================
     STEPPER
  ========================== */

  goToStep(step: number): void {

    this.currentStep = step;

  }

  /* =========================
     GET LOCATION
  ========================== */

  getLocation(): void {

    this.locationService
      .getLocationById(this.locationId)
      .subscribe({

        next: (response) => {

          console.log(response);
          console.log(
  'CATEGORY',
  response.locationCategoryId
);

console.log(
  'AMENITIES',
  response.amenities
);

          this.patchForm(response);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

 patchForm(location: any): void {

  /* =========================
     PATCH SIMPLE FIELDS
  ========================== */

  this.form.patchValue({

    // BASIC

    name:
      location.name,

    description:
      location.description,

    imageUrl:
      location.imageUrl,

    // ADDRESS

    street:
      location.street,

    city:
      location.city,

    state:
      location.state,

    zipCode:
      location.zipCode,

    building:
      location.building,

    floor:
      location.floor,

    unit:
      location.unit,

    neighborhood:
      location.neighborhood,

    // CONTACT

    phone:
      location.phone,

    website:
      location.website,

    email:
      location.email,

    // CATEGORY

    locationCategoryId:
      location.locationCategoryId,

    // PRICING

    pricePerHour:
      location.pricePerHour,

    /* =========================
       FOOD & BEVERAGE
    ========================== */

    fullEquippedBar:
      location.foodAndBeverage?.fullEquippedBar,

    byoDrinksAllowed:
      location.foodAndBeverage?.byoDrinksAllowed,

    fullKitchen:
      location.foodAndBeverage?.fullKitchen,

    byoFoodAllowed:
      location.foodAndBeverage?.byoFoodAllowed,

    cuisineTypes:
      location.foodAndBeverage?.cuisineTypes,

    foodMenuUrl:
  location.foodAndBeverage?.foodMenuUrl,

beverageMenuUrl:
  location.foodAndBeverage?.beverageMenuUrl,

    /* =========================
       PHYSICAL INFO
    ========================== */

    totalCapacity:
      location.physicalInfo?.totalCapacity,

    indoorFlag:
      location.physicalInfo?.indoorFlag,

    outdoorFlag:
      location.physicalInfo?.outdoorFlag,

    numberOfRooms:
      location.physicalInfo?.numberOfRooms,

    roomsListJson:
  location.physicalInfo?.roomsListJson
    ? JSON.parse(
        location.physicalInfo.roomsListJson
      )
    : [],

    numberOfTables:
      location.physicalInfo?.numberOfTables,

    numberOfSeats:
      location.physicalInfo?.numberOfSeats,

    squareFootage:
      location.physicalInfo?.squareFootage,

    numberOfBathrooms:
      location.physicalInfo?.numberOfBathrooms,

    /* =========================
       CLASSIFICATION
    ========================== */

    privateAreaFlag:
      location.classification?.privateAreaFlag,

    /* =========================
       OPERATIONAL
    ========================== */

    checkInEnabled:
      location.operationalInfo?.checkInEnabled,

    /* =========================
       POLICY
    ========================== */

    cleaningPolicyType:
      location.policy?.cleaningPolicyType,

    cancellationPolicyType:
      location.policy?.cancellationPolicyType,

    accessNotes:
      location.policy?.accessNotes,

    /* =========================
       HOUSE RULES
    ========================== */

    noSmoking:
      location.houseRules?.noSmoking,

    noOutsideAlcohol:
      location.houseRules?.noOutsideAlcohol,

    noLoudMusic:
      location.houseRules?.noLoudMusic,

    cateringAllowed:
      location.houseRules?.cateringAllowed,

    petFriendly:
      location.houseRules?.petFriendly,

    allAgesWelcome:
      location.houseRules?.allAgesWelcome,

    additionalHouseRules:
      location.houseRules?.additionalHouseRules,

    /* =========================
       COMPLIANCE
    ========================== */

    accessibilityFriendly:
      location.compliance?.accessibilityFriendly,

    securityPersonnelAvailable:
      location.compliance?.securityPersonnelAvailable,

    cctv24_7:
      location.compliance?.cctV24_7

  });

  /* =========================
     AMENITIES
  ========================== */

  const amenitiesArray =
    this.form.get('amenities') as any;

  amenitiesArray.clear();

 location.amenities?.forEach(
  (amenity: any) => {

    amenitiesArray.push(

      this.fb.group({

        amenityId: [
          amenity.amenityId
        ],

        price: [
          amenity.price
        ]

      })

    );

  }
);

/* =========================
   USAGE TYPES
========================== */

const usageTypesArray =
  this.form.get('usageTypes') as any;

usageTypesArray.clear();

location.usageTypes?.forEach(
  (usage: any) => {

    usageTypesArray.push(

      this.fb.group({

        id: [usage.id],

        name: [usage.name]

      })

    );

  }
);

  /* =========================
     WORKING HOURS
  ========================== */

  const workingHoursArray =
    this.form.get('workingHours') as any;

  workingHoursArray.clear();

  location.workingHours?.forEach(
    (hour: any) => {

      workingHoursArray.push(

        this.fb.group({

          day: [hour.day],

          from: [hour.from],

          to: [hour.to],

          isClosed: [hour.isClosed]

        })

      );

    }
  );


  /* =========================
     MEDIA
  ========================== */

  const mediaArray =
    this.form.get('media') as any;

  mediaArray.clear();

  location.media?.forEach(
    (media: any) => {

      mediaArray.push(

        this.fb.group({

          url: [media.url],

          type: [media.type],

          isPrimary: [media.isPrimary]

        })

      );

    }
  );

  /* =========================
     SECTIONS
  ========================== */

  const sectionsArray =
    this.form.get('sections') as any;

  sectionsArray.clear();

  location.sections?.forEach(
  (section: any) => {

    const availabilitiesArray: any =
  this.fb.array([]);

    section.availabilities?.forEach(
      (availability: any) => {

        availabilitiesArray.push(

          this.fb.group({

            startDate: [
              availability.startDate
            ],

            endDate: [
              availability.endDate
            ],

            timeZone: [
              availability.timeZone
            ]

          })

        );

      }
    );

    sectionsArray.push(

      this.fb.group({

        name: [section.name],

        type: [section.type],

        capacity: [section.capacity],

        width: [section.width],

        length: [section.length],

        height: [section.height],

        availabilities:
          availabilitiesArray

      })

    );

  }
);
/* =========================
   FORCE CATEGORY RESTORE
========================== */

setTimeout(() => {

  this.form.patchValue({

    locationCategoryId:
      location.locationCategoryId

  });

}, 0);
}
  /* =========================
     UPDATE
  ========================== */

 updateLocation(
  saveAsDraft: boolean = false
): void {

  if (this.isSubmitting) {

    return;

  }

  this.isSubmitting = true;

  const formValue =
    this.form.value;

  const payload = {

    /* =========================
       BASIC
    ========================== */

    name:
      formValue.name,

    description:
      formValue.description,

    imageUrl:
      formValue.imageUrl,

    phone:
      formValue.phone,

    website:
      formValue.website,

    email:
      formValue.email,

    /* =========================
       ADDRESS
    ========================== */

    street:
      formValue.street,

    city:
      formValue.city,

    state:
      formValue.state,

    zipCode:
      formValue.zipCode,

    building:
      formValue.building,

    floor:
      formValue.floor,

    unit:
      formValue.unit,

    neighborhood:
      formValue.neighborhood,

    /* =========================
       CATEGORY
    ========================== */

    locationCategoryId:
      formValue.locationCategoryId,

    /* =========================
       PRICING
    ========================== */

    pricePerHour:
      formValue.pricePerHour,

    /* =========================
       ARRAYS
    ========================== */

    amenities:
      formValue.amenities || [],

    usageTypes:

  (formValue.usageTypes || []).map(
    (usage: any) => ({

      name: usage.name

    })
  ),
    workingHours:
      formValue.workingHours || [],


    media:
      formValue.media || [],

    sections:
      formValue.sections || [],

    /* =========================
       FOOD & BEVERAGE
    ========================== */

    foodAndBeverage: {

      fullEquippedBar:
        formValue.fullEquippedBar,

      byoDrinksAllowed:
        formValue.byoDrinksAllowed,

      fullKitchen:
        formValue.fullKitchen,

      byoFoodAllowed:
        formValue.byoFoodAllowed,

      cuisineTypes:
        formValue.cuisineTypes,

      foodMenuUrl:
    formValue.foodMenuUrl,

  beverageMenuUrl:
    formValue.beverageMenuUrl

    },

    /* =========================
       PHYSICAL INFO
    ========================== */

    physicalInfo: {

      totalCapacity:
        formValue.totalCapacity,

      indoorFlag:
        formValue.indoorFlag,

      outdoorFlag:
        formValue.outdoorFlag,

      numberOfRooms:
        formValue.numberOfRooms,

     roomsListJson:

  typeof formValue.roomsListJson === 'string'

    ? formValue.roomsListJson

    : JSON.stringify(
        formValue.roomsListJson || []
      ),

      numberOfTables:
        formValue.numberOfTables,

      numberOfSeats:
        formValue.numberOfSeats,

      squareFootage:
        formValue.squareFootage,

      numberOfBathrooms:
        formValue.numberOfBathrooms

    },

    /* =========================
       CLASSIFICATION
    ========================== */

   classification: {

  ownershipType:
    'Private',

  accessType:
    'Public',

  bookableFlag:
    true,

  ticketedFlag:
    false,

  commercialFlag:
    true,

  privateAreaFlag:
    formValue.privateAreaFlag

},

    /* =========================
       OPERATIONAL
    ========================== */

    operationalInfo: {

      assistantManagerAccountId:
        null,

      hostAccountId:
        null,

      assistantHostAccountId:
        null,

      revenueModelType:
        null,

      expensesModelType:
        null,

      auditTrailId:
        null,

      checkInEnabled:
        formValue.checkInEnabled

    },

    /* =========================
       POLICY
    ========================== */

    policy: {

      cleaningPolicyType:
        formValue.cleaningPolicyType,

      additionalCleaningFee:
        0,

      cancellationPolicyType:
        formValue.cancellationPolicyType,

      minBookingHours:
        1,

      instantBookingAllowed:
        true,

      requiresApproval:
        false,

      accessNotes:
        formValue.accessNotes

    },

    /* =========================
       HOUSE RULES
    ========================== */

    houseRules: {

      noSmoking:
        formValue.noSmoking,

      noOutsideAlcohol:
        formValue.noOutsideAlcohol,

      noLoudMusic:
        formValue.noLoudMusic,

      cateringAllowed:
        formValue.cateringAllowed,

      petFriendly:
        formValue.petFriendly,

      allAgesWelcome:
        formValue.allAgesWelcome,

      additionalHouseRules:
        formValue.additionalHouseRules

    },

    /* =========================
       COMPLIANCE
    ========================== */

    compliance: {

      alcoholLicense:
        false,

      permitRequired:
        false,

      insuranceRequired:
        false,

      noiseRestriction:
        false,

      securityRequired:
        false,

      accessibilityFriendly:
        formValue.accessibilityFriendly,

      securityPersonnelAvailable:
        formValue.securityPersonnelAvailable,

      cctV24_7:
        formValue.cctv24_7

    },

    /* =========================
       TECHNICAL SPECIFICATIONS
    ========================== */

    technicalSpecification: null,

    /* =========================
       OWNER IDS
    ========================== */

    locationOwnerAccountId:
      null,

    locationManagerAccountId:
      null

  };

  console.log(
    'UPDATE PAYLOAD:',
    payload
  );

  this.locationService
    .updateLocation(
      this.locationId,
      payload
    )
    .subscribe({

      next: () => {

        this.isSubmitting =
          false;

        alert(
          'Location Updated Successfully'
        );

      },

     error: (error) => {

  console.log(
    'VALIDATION ERRORS:',
    error.error.errors
  );

  console.error(error);

  this.isSubmitting =
    false;

}

    });

}

}
