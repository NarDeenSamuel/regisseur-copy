import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({

  selector:
    'app-location-media',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './location-media.component.html',

  styleUrls: [
    './location-media.component.css'
  ]

})
export class LocationMediaComponent {
  @Output()
backStep =

  new EventEmitter<void>();
currentStep = 1;
  // IMAGE SLOTS
@Output()
nextStep =

  new EventEmitter<void>();
  slots = [2, 3, 4, 5];
goBack(): void {

  this.backStep.emit();

}
goNext(): void {

  this.nextStep.emit();

}
}
