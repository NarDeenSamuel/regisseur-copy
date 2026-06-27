import {
  Component,
  OnInit,
  AfterViewChecked,
  inject,
  PLATFORM_ID,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  LocationCategory
} from '../../models/location-category.model';
import {
  isPlatformBrowser,
  DatePipe
} from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormsModule
} from '@angular/forms';

import {
  createIcons,
  icons
} from 'lucide';

import {
  LocationService
} from '../../services/location.service';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';

import {
  MatNativeDateModule
} from '@angular/material/core';

import {
  MatInputModule
} from '@angular/material/input';
import { AmenityCategory } from '../../models/amenity-category';
@Component({
  selector: 'app-location-space-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    // DatePipe
  ],
  templateUrl: './location-space-info.component.html',
  styleUrl: './location-space-info.component.css'
})
export class LocationSpaceInfoComponent
  implements
AfterViewChecked,
OnInit,
OnChanges {
  @Input()
  form: any;
  @Output()
  nextStep =

    new EventEmitter<void>();
  private platformId =
    inject(PLATFORM_ID);

  private fb =
    inject(FormBuilder);

  private locationService =
    inject(LocationService);
  // =========================
  // CATEGORIES
  // =========================

  categories:
    LocationCategory[] = [];

  parentCategories:
    LocationCategory[] = [];

  selectedParentCategory:
    LocationCategory | null = null;

  selectedCategoryId:
    number | null = null;
  newParentCategoryName = '';

  newChildCategoryName = '';


  amenityCategories: AmenityCategory[] = [];
newAmenityCategoryName = '';

newAmenityName = '';

selectedAmenityCategoryId: number | null = null;


  get usageTypes(): FormArray {

    return this.form.get(
      'usageTypes'
    ) as FormArray;

  }
  toggleUsageType(
    name: string,
    event: Event
  ): void {

    const checked =
      (event.target as HTMLInputElement)
        .checked;

    if (checked) {

      this.usageTypes.push(

        this.fb.group({

          name: [name]

        })

      );

    } else {

      const index =

        this.usageTypes.controls.findIndex(
          x => x.value.name === name
        );

      if (index >= 0) {

        this.usageTypes.removeAt(index);

      }

    }

  }
 isUsageSelected(name: string): boolean {

  return this.form
    .value
    .usageTypes
    ?.some(
      (x: any) => x.name === name
    );

}
 loadCategories(): void {

  this.locationService
    .getCategories()
    .subscribe({

      next: (res) => {

        this.categories = res;

        this.parentCategories =
          res.filter(
            x =>
              !x.parentCategoryId &&
              x.isActive
          );

        /* =========================
           RESTORE SELECTED CATEGORY
        ========================== */

       this.restoreSelectedCategory();

      },

      error: (error) => {

        console.error(error);

      }

    });

}
  addParentCategory(): void {

    if (!this.newParentCategoryName.trim())
      return;

    this.locationService
      .createCategory({

        name:
          this.newParentCategoryName,

        parentCategoryId:
          null

      })
      .subscribe({

        next: () => {

          this.newParentCategoryName = '';

          this.loadCategories();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  addChildCategory(): void {

    if (
      !this.newChildCategoryName.trim() ||
      !this.selectedParentCategory
    ) return;

    this.locationService
      .createCategory({

        name:
          this.newChildCategoryName,

        parentCategoryId:
          this.selectedParentCategory.id

      })
      .subscribe({

        next: () => {

          this.newChildCategoryName = '';

          this.loadCategories();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  onParentCategoryChange(event: Event): void {

    const selectElement =
      event.target as HTMLSelectElement;

    const parentId =
      Number(selectElement.value);

    this.selectedParentCategory =

      this.parentCategories.find(
        x => x.id === parentId
      ) || null;

    this.selectedCategoryId = null;

  }
  get childCategories(): LocationCategory[] {

    if (!this.selectedParentCategory)
      return [];

    return this.selectedParentCategory.children || [];

  }
  selectParentCategory(
    category: LocationCategory
  ): void {

    this.selectedParentCategory =
      category;

    this.selectedCategoryId =
      null;

  }
  selectCategory(
    category: LocationCategory
  ): void {

    this.selectedCategoryId =
      Number(category.id);
    this.form.patchValue({

      locationCategoryId:
        category.id

    });

  }
  // FORM



  // GETTERS

  get amenities(): FormArray {

    return this.form.get(
      'amenities'
    ) as FormArray;

  }

  get workingHours(): FormArray {

    return this.form.get(
      'workingHours'
    ) as FormArray;

  }

  get availabilities(): FormArray {

    return this.form.get(
      'availabilities'
    ) as FormArray;

  }

  get media(): FormArray {

    return this.form.get(
      'media'
    ) as FormArray;

  }

  get sections(): FormArray {

    return this.form.get(
      'sections'
    ) as FormArray;

  }
  initializeWorkingHours(): void {

  const days = [

    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'

  ];

  this.workingHours.clear();

  days.forEach(day => {

    this.workingHours.push(

      this.fb.group({

        day: [day],

        from: ['09:00'],

        to: ['17:00'],

        isClosed: [false]

      })

    );

  });

}

loadAmenities(): void {

  this.locationService
    .getAmenities()
    .subscribe({

      next: (res) => {

        console.log(
          'AMENITY CATEGORIES',
          res
        );

        this.amenityCategories = res;

        setTimeout(() => {

          const firstAmenityId =
            this.amenities.value?.[0]?.amenityId;

          console.log(
            'FIRST AMENITY ID',
            firstAmenityId
          );

          if (!firstAmenityId) {
            return;
          }

          const category =
            this.amenityCategories.find(
              c => c.amenities.some(
                a => a.id === firstAmenityId
              )
            );

          console.log(
            'FOUND CATEGORY',
            category
          );

          if (category) {

            this.selectedAmenityCategoryId =
              category.id;

          }

        });

      },

      error: (err) => {

        console.error(err);

      }

    });

}
ngOnInit(): void {

  this.loadCategories();
  this.loadAmenities();
  this.initializeWorkingHours();

  this.form
    ?.get('locationCategoryId')
    ?.valueChanges
    .subscribe((value: number) => {

      console.log(
        'CATEGORY CHANGED',
        value
      );

      this.restoreSelectedCategory();

    });
     this.form
    .get('amenities')
    ?.valueChanges
    .subscribe(() => {

      console.log(
        'AMENITIES UPDATED',
        this.amenities.value
      );

      this.restoreAmenityCategory();

    });

}
 ngOnChanges(
  changes: SimpleChanges
): void {

  if (changes['form']) {

    setTimeout(() => {

      this.restoreSelectedCategory();

      this.restoreAmenityCategory();

    });

  }

}
restoreAmenityCategory(): void {

  const firstAmenityId =
    this.amenities.value?.[0]?.amenityId;

  console.log(
    'RESTORE AMENITY ID',
    firstAmenityId
  );

  if (!firstAmenityId) {
    return;
  }

  const category =
    this.amenityCategories.find(
      c => c.amenities.some(
        a => a.id === firstAmenityId
      )
    );

  console.log(
    'FOUND AMENITY CATEGORY',
    category
  );

  if (category) {

    this.selectedAmenityCategoryId =
      category.id;

  }

}
restoreSelectedCategory(): void {

  const selectedCategoryId =
    Number(
      this.form.get(
        'locationCategoryId'
      )?.value
    );

  console.log(
    'RESTORE CATEGORY',
    selectedCategoryId
  );

  this.selectedParentCategory = null;
  this.selectedCategoryId = null;

  for (const parent of this.parentCategories) {

    const child =
      parent.children?.find(
        x => Number(x.id) === selectedCategoryId
      );

    if (child) {

      this.selectedParentCategory = parent;
      this.selectedCategoryId = child.id;

      console.log(
        'FOUND',
        parent.name,
        child.name
      );

      return;
    }
  }

}

  // ICONS

  ngAfterViewChecked(): void {

    if (isPlatformBrowser(this.platformId)) {

      createIcons({
        icons
      });

    }

  }

  // =========================
  // AMENITIES
  // =========================

 toggleAmenity(
  amenityId: number,
  checked: boolean
): void {

  if (checked) {

    this.amenities.push(

      this.fb.group({

        amenityId: [amenityId],

        price: [0]

      })

    );

  } else {

    const index =
      this.amenities.controls.findIndex(
        x =>
          x.value.amenityId ===
          amenityId
      );

    if (index >= 0) {

      this.amenities.removeAt(index);

    }

  }

}
isAmenitySelected(
  amenityId: number
): boolean {

  return this.amenities.value?.some(
    (x: any) =>
      x.amenityId === amenityId
  );

}
addAmenityCategory(): void {

  if (!this.newAmenityCategoryName.trim())
    return;

  this.locationService
    .createAmenityCategory({
      name: this.newAmenityCategoryName
    })
    .subscribe(() => {

      this.newAmenityCategoryName = '';

      this.loadAmenities();

    });

}
addAmenity(): void {

  if (
    !this.newAmenityName.trim() ||
    !this.selectedAmenityCategoryId
  )
    return;

  this.locationService
    .createAmenity({

      name: this.newAmenityName,

      amenityCategoryId:
        this.selectedAmenityCategoryId

    })
    .subscribe(() => {

      this.newAmenityName = '';

      this.loadAmenities();

    });

}
expandedCategoryId: number | null = null;

toggleCategory(id: number) {

  this.expandedCategoryId =
    this.expandedCategoryId === id
      ? null
      : id;

}
get selectedAmenityCategory() {

  return this.amenityCategories.find(
    x => x.id === this.selectedAmenityCategoryId
  );

}
getAmenityName(
  amenityId: number
): string {

  for (const category of this.amenityCategories) {

    const amenity = category.amenities.find(
      x => x.id === amenityId
    );

    if (amenity) {
      return amenity.name;
    }
  }

  return '';
}
  // =========================
  // WORKING HOURS
  // =========================

  addWorkingHour(): void {

    this.workingHours.push(

      this.fb.group({

        day: ['Monday'],

        from: ['09:00'],

        to: ['17:00'],

        isClosed: [false]

      })

    );

  }

  removeWorkingHour(index: number): void {

    this.workingHours.removeAt(index);

  }


  // =========================
  // MEDIA
  // =========================

  addMedia(url: string): void {

    if (!url.trim()) return;

    this.media.push(

      this.fb.group({

        url: [url],

        type: ['Image'],

        isPrimary: [false]

      })

    );

  }

  removeMedia(index: number): void {

    this.media.removeAt(index);

  }

  // =========================
  // SECTIONS
  // =========================

  addSection(): void {

    this.sections.push(

      this.fb.group({

        name: ['Main Hall'],

        type: ['Indoor'],

        capacity: [0],

        width: [0],

        length: [0],

        height: [0]

      })

    );

  }

  removeSection(index: number): void {

    this.sections.removeAt(index);

  }

  // =========================
  // SUBMIT
  // =========================


  asFormGroup(control: any) {

    return control;

  }
  goNext(): void {

    const requiredFields = [

      'name',
      'description',
      'locationCategoryId',
      'pricePerHour',
      'street',
      'city',
      'state',
      'phone',
      'website',
      'email',
      'building',
      'floor',
      'unit',
      'neighborhood',
      'zipCode'

    ];

    let hasError = false;

    requiredFields.forEach(field => {

      const control =
        this.form.get(field);

      if (

        !control ||

        control.value === null ||

        control.value === undefined ||

        control.value === ''

      ) {

        control?.setErrors({
          required: true
        });

        control?.markAsTouched();

        hasError = true;

      }

    });

    // CATEGORY REQUIRED

    if (!this.selectedCategoryId) {

      this.form.get(
        'locationCategoryId'
      )?.setErrors({
        required: true
      });

      this.form.get(
        'locationCategoryId'
      )?.markAsTouched();

      hasError = true;

    }

    // HOST TYPES REQUIRED

    if (
      this.usageTypes.length === 0
    ) {

      this.form.get(
        'usageTypes'
      )?.setErrors({
        required: true
      });

      this.form.get(
        'usageTypes'
      )?.markAsTouched();

      hasError = true;

    } else {

      this.form.get(
        'usageTypes'
      )?.setErrors(null);

    }


    // WORKING HOURS REQUIRED

    if (
      this.workingHours.length === 0
    ) {

      this.form.get(
        'workingHours'
      )?.setErrors({
        required: true
      });

      this.form.get(
        'workingHours'
      )?.markAsTouched();

      hasError = true;

    } else {

      this.form.get(
        'workingHours'
      )?.setErrors(null);

    }

    // AMENITIES REQUIRED

    if (
      this.amenities.length === 0
    ) {

      this.form.get(
        'amenities'
      )?.setErrors({
        required: true
      });

      this.form.get(
        'amenities'
      )?.markAsTouched();

      hasError = true;

    } else {

      this.form.get(
        'amenities'
      )?.setErrors(null);

    }

    if (hasError)
      return;

    this.nextStep.emit();

  }

}
