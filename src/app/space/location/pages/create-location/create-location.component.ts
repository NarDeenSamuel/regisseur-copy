import {
  Component,
  OnInit,
  AfterViewChecked,
  inject,
  PLATFORM_ID,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { LocationStepperComponent } from '../../components/location-stepper/location-stepper.component';
import { LocationSpaceInfoComponent } from '../../components/location-space-info/location-space-info.component';
import {
  LocationMediaComponent
} from '../../components/location-media/location-media.component';
import {
  FormBuilder
} from '@angular/forms';
import {
  LocationAmenitiesComponent
} from '../../components/location-amenities/location-amenities.component';
import {
  LocationRulesComponent
} from '../../components/location-rules/location-rules.component';
import { LocationService } from '../../services/location.service';
import {
  LocationPhysicalInfoComponent
} from '../../components/location-physical-info/location-physical-info.component';
import {
  LocationFoodBeverageComponent
} from '../../components/location-food-beverage/location-food-beverage.component';
import {
  LocationSectionsComponent
} from '../../components/location-sections/location-sections.component';
import { Router } from '@angular/router';
import { AmenityCategory } from '../../models/amenity-category';
@Component({
  selector: 'app-create-location',
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
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.scss'
})
export class CreateLocationComponent implements OnInit{
private locationService =
  inject(LocationService);

amenityCategories: AmenityCategory[] = [];
  currentStep = 0;

  private fb =
    inject(FormBuilder);
private router =
  inject(Router);
  isSubmitting = false;
  ngOnInit(): void {

  this.loadAmenities();

}
loadAmenities(): void {

  this.locationService
    .getAmenities()
    .subscribe({

      next: (res) => {

        this.amenityCategories = res;

      },

      error: (err) => {

        console.error(err);

      }

    });

}
  goToStep(step: number): void {

    this.currentStep = step;

  }
  form = this.fb.group({

    // BASIC

    name: [''],
    description: [''],
    imageUrl: [''],

    // CONTACT

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
    // ADDRESS

    neighborhood: [''],
    building: [''],
    street: [''],
    floor: [''],
    unit: [''],
    city: [''],
    state: [''],
    zipCode: [''],

    // CATEGORY

    locationCategoryId: [1],

    // PRICING

    pricePerHour: [0],

   // AREA DETAILS

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

    // COMPLIANCE

    accessibilityFriendly: [false],
    securityPersonnelAvailable: [false],
    cctv24_7: [false],

    // ARRAYS

    amenities: this.fb.array([]),
    usageTypes: this.fb.array([]),

    workingHours: this.fb.array([]),

    media: this.fb.array([]),

    sections: this.fb.array([])

  });
  
submitLocation(
  saveAsDraft: boolean = false
): void {
  if (this.isSubmitting)
    return;

  this.isSubmitting = true;
  const formValue =
    this.form.value;

  const payload = {

    // BASIC

    name:
      formValue.name,

    description:
      formValue.description,

    imageUrl:
      formValue.imageUrl,

    // ADDRESS

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

    // CONTACT

    phone:
      formValue.phone,

    website:
      formValue.website,
email:
  formValue.email,
    // CATEGORY

    locationCategoryId:
      formValue.locationCategoryId,

    // PRICING

    pricePerHour:
      formValue.pricePerHour,

    // ARRAYS

    amenities:
      formValue.amenities,
      usageTypes:
  formValue.usageTypes,
    workingHours:
      formValue.workingHours,

   
    media:
      formValue.media,

    sections:
      formValue.sections,

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
    // CLASSIFICATION

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

    // COMPLIANCE

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

    // PHYSICAL INFO

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
  JSON.stringify(
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

    // POLICY

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

    // HOUSE RULES

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
saveAsDraft:
  saveAsDraft,
    // OPERATIONAL INFO

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

    }

  };

  console.log(payload);

  this.locationService
    .createLocation(payload as any)
    .subscribe({

      next: (response) => {

  console.log(
    'Location Created:',
    response
  );

  this.isSubmitting = false;

  // DRAFT

  if (saveAsDraft) {

    this.router.navigate([
      '/locations'
    ]);

    return;

  }

  // SUBMIT FLOW

  this.router.navigate([
    '/location/verify',
    response
  ]);

},

      error: (error) => {

        console.error(error);

        this.isSubmitting =
          false;

        alert(
          'Failed To Create Location'
        );

      }

    });

}
}