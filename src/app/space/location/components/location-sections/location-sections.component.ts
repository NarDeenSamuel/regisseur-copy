import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
    Validators

} from '@angular/forms';

@Component({
  selector: 'app-location-sections',

  standalone: true,

  imports: [
    CommonModule,
   ReactiveFormsModule
  ],

  templateUrl:
    './location-sections.component.html',

  styleUrl:
    './location-sections.component.css'
})
export class LocationSectionsComponent {

  @Input()
  form: any;

  @Output()
  nextStep =
    new EventEmitter<void>();

  @Output()
  backStep =
    new EventEmitter<void>();

  private fb =
    inject(FormBuilder);

  get sections(): FormArray {

    return this.form.get(
      'sections'
    ) as FormArray;

  }

  addSection(): void {

  this.sections.push(

  this.fb.group({

  name: ['',
    Validators.required
  ],

  type: [
    'Indoor',
    Validators.required
  ],

  capacity: [
    null,
    [
      Validators.required,
      Validators.min(1)
    ]
  ],

  width: [
    null,
    [
      Validators.required,
      Validators.min(1)
    ]
  ],

  length: [
    null,
    [
      Validators.required,
      Validators.min(1)
    ]
  ],

  height: [
    null,
    [
      Validators.required,
      Validators.min(1)
    ]
  ],

  availabilities:
    this.fb.array([])

})

  );

}

  removeSection(index: number): void {

    this.sections.removeAt(index);

  }
  asFormGroup(control: any) {
  return control;
}
getAvailabilities(
  sectionIndex: number
): FormArray {

  const section =
    this.sections.at(sectionIndex);

  return section.get(
    'availabilities'
  ) as FormArray;

}
addAvailability(
  sectionIndex: number
): void {

  this.getAvailabilities(
    sectionIndex
  ).push(

    this.fb.group({

      startDate: [''],

      endDate: [''],

      timeZone: [
        'Africa/Cairo'
      ]

    })

  );

}
removeAvailability(
  sectionIndex: number,
  availabilityIndex: number
): void {

  this.getAvailabilities(
    sectionIndex
  ).removeAt(
    availabilityIndex
  );

}
 goNext(): void {

  let hasError = false;

  // REQUIRED SECTIONS

  if (
    this.sections.length === 0
  ) {

    this.form.get(
      'sections'
    )?.setErrors({
      required: true
    });

    this.form.get(
      'sections'
    )?.markAsTouched();

    hasError = true;

  }

  // VALIDATE EACH SECTION

 this.sections.controls.forEach(
  (section: any, index: number) => {

    section.markAllAsTouched();

    const availabilities =
      this.getAvailabilities(index);

    if (
      availabilities.length === 0
    ) {

      availabilities.setErrors({
        required: true
      });

      hasError = true;

    }

    if (section.invalid) {

      hasError = true;

    }

  }
);
  if (hasError)
    return;

  this.nextStep.emit();

}
  goBack(): void {

    this.backStep.emit();

  }

}
