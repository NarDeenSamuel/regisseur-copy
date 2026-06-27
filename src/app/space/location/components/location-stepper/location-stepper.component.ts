import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-stepper.component.html',
  styleUrl: './location-stepper.component.css'
})
export class LocationStepperComponent {

steps = [

  'Space Information',

  'Media',

  'Amenities & Pricing',

  'Physical Information',

  'Food & Beverage',

  'Sections',

  'Rules & Policies'

];
  @Input()
currentStep = 0;

}
