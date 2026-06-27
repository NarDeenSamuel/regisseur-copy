import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormArray,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { AmenityCategory } from '../../models/amenity-category';

@Component({

  selector:
    'app-location-amenities',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './location-amenities.component.html',

  styleUrls: [
    './location-amenities.component.css'
  ]

})
export class LocationAmenitiesComponent {
  @Input()
amenityCategories: AmenityCategory[] = [];
@Output()
backStep =

  new EventEmitter<void>();
  @Input()
  form!: FormGroup;
@Output()
nextStep =

  new EventEmitter<void>();
  get amenities(): FormArray {

    return this.form.get(
      'amenities'
    ) as FormArray;

  }

  removeAmenity(index: number): void {

    this.amenities.removeAt(index);

  }

  asFormGroup(control: any) {

    return control;

  }
goBack(): void {

  this.backStep.emit();

}
goNext(): void {

  let hasError = false;

  this.amenities.controls.forEach(
    (amenity: any) => {

      const priceControl =

        amenity.get('price');

      if (

        !priceControl ||

        priceControl.value === null ||

        priceControl.value === '' ||

        Number(priceControl.value) <= 0

      ) {

        priceControl?.setErrors({
          required: true
        });

        priceControl?.markAsTouched();

        hasError = true;

      }

    }
  );

  if (hasError)
    return;

  this.nextStep.emit();

}
getAmenityName(
  amenityId: number
): string {

  return this.amenityCategories
    .flatMap(x => x.amenities)
    .find(x => x.id === amenityId)
    ?.name ?? '';

}
getAmenityCategoryName(
  amenityId: number
): string {

  const category =
    this.amenityCategories.find(
      c => c.amenities.some(
        a => a.id === amenityId
      )
    );

  return category?.name ?? '';

}
}
