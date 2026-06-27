import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-location-physical-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl:
    './location-physical-info.component.html',

  styleUrl:
    './location-physical-info.component.css'
})
export class LocationPhysicalInfoComponent
implements OnInit {

  @Input()
  form: any;

  @Output()
  nextStep =
    new EventEmitter<void>();

  @Output()
  backStep =
    new EventEmitter<void>();
roomsList: string[] = [];
ngOnInit(): void {

  const roomsValue =

    this.form
      ?.get('roomsListJson')
      ?.value;

  if (!roomsValue) {

    this.roomsList = [];

    return;

  }

  try {

    this.roomsList =

      typeof roomsValue === 'string'

        ? JSON.parse(roomsValue)

        : roomsValue;

  } catch {

    this.roomsList = [];

  }

}
  goNext(): void {

  const requiredFields = [

    'totalCapacity',
    'numberOfRooms',
    'numberOfTables',
    'numberOfSeats',
    'squareFootage',
    'numberOfBathrooms'

  ];

  let hasError = false;

  requiredFields.forEach(field => {

    const control =
      this.form.get(field);

    if (

      !control ||

      control.value === null ||

      control.value === '' ||

      Number(control.value) <= 0

    ) {

      control?.setErrors({
        required: true
      });

      control?.markAsTouched();

      hasError = true;

    }

  });

  // ROOMS REQUIRED

  if (
    this.roomsList.length === 0
  ) {

    this.form.get(
      'roomsListJson'
    )?.setErrors({
      required: true
    });

    this.form.get(
      'roomsListJson'
    )?.markAsTouched();

    hasError = true;

  } else {

    this.form.get(
      'roomsListJson'
    )?.setErrors(null);

  }

  if (hasError)
    return;

  this.nextStep.emit();

}

  goBack(): void {

    this.backStep.emit();

  }
addRoom(room: string): void {

  if (!room.trim())
    return;

  this.roomsList.push(room);

  this.form.patchValue({

    roomsListJson:
  JSON.stringify(this.roomsList)

  });
  this.form.get(
  'roomsListJson'
)?.setErrors(null);

this.form.get(
  'roomsListJson'
)?.markAsTouched();

this.form.get(
  'roomsListJson'
)?.updateValueAndValidity();

}

removeRoom(index: number): void {

  this.roomsList.splice(index, 1);

  this.form.patchValue({

    roomsListJson:
  JSON.stringify(this.roomsList)

  });
if (
  this.roomsList.length === 0
) {

  this.form.get(
    'roomsListJson'
  )?.setErrors({
    required: true
  });

}
}
}
