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
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-location-food-beverage',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './location-food-beverage.component.html',

  styleUrl:
    './location-food-beverage.component.css'
})
export class LocationFoodBeverageComponent {

  @Input()
  form: any;

  @Output()
  nextStep =
    new EventEmitter<void>();

  @Output()
  backStep =
    new EventEmitter<void>();

 goNext(): void {

  const requiredFields = [

  'foodMenuUrl',

  'beverageMenuUrl',

  'cuisineTypes'

];

  let hasError = false;

  requiredFields.forEach(field => {

    const control =
      this.form.get(field);

    if (

      !control ||

      !control.value ||

      !control.value.trim()

    ) {

      control?.setErrors({
        required: true
      });

      control?.markAsTouched();

      hasError = true;

    }

  });

  if (hasError)
    return;

  this.nextStep.emit();

}

  goBack(): void {

    this.backStep.emit();

  }

}
