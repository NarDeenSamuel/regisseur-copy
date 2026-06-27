import {
  Component,
  AfterViewChecked,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule
} from '@angular/forms';

import {
  createIcons,
  icons
} from 'lucide';

@Component({

  selector:
    'app-location-rules',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './location-rules.component.html',

  styleUrls: [
    './location-rules.component.scss'
  ]

})
export class LocationRulesComponent
implements
AfterViewChecked,
OnInit {

  @Input()
  form: any;
@Input()
isSubmitting = false;
  @Output()
  backStep =
    new EventEmitter<void>();

  @Output()
  submitForm =
    new EventEmitter<void>();
@Output()
saveDraft =
  new EventEmitter<void>();
  selectedCleaningPolicy = 1;

  selectedCancellationPolicy = 1;

  houseRules = [

    {
      label: 'No Smoking',
      key: 'noSmoking',
      selected: false
    },

    {
      label: 'Catering Allowed',
      key: 'cateringAllowed',
      selected: false
    },

    {
      label: 'No Outside Alcohol',
      key: 'noOutsideAlcohol',
      selected: false
    },

    {
      label: 'Pet Friendly',
      key: 'petFriendly',
      selected: false
    },

    {
      label: 'No Loud Music',
      key: 'noLoudMusic',
      selected: false
    },

    {
      label: 'All Ages Welcome',
      key: 'allAgesWelcome',
      selected: false
    }

  ];
ngOnInit(): void {

  /* =========================
     CLEANING POLICY
  ========================== */

  const cleaningPolicy =

    this.form.get(
      'cleaningPolicyType'
    )?.value;

  switch (cleaningPolicy) {

    case 'IncludedInPrice':

      this.selectedCleaningPolicy = 1;

      break;

    case 'AdditionalFee':

      this.selectedCleaningPolicy = 2;

      break;

    case 'GuestResponsible':

      this.selectedCleaningPolicy = 3;

      break;

  }

  /* =========================
     CANCELLATION POLICY
  ========================== */

  const cancellationPolicy =

    this.form.get(
      'cancellationPolicyType'
    )?.value;

  switch (cancellationPolicy) {

    case 'Flexible':

      this.selectedCancellationPolicy = 1;

      break;

    case 'Moderate':

      this.selectedCancellationPolicy = 2;

      break;

    case 'Strict':

      this.selectedCancellationPolicy = 3;

      break;

  }

  /* =========================
     HOUSE RULES
  ========================== */

  this.houseRules.forEach(rule => {

    rule.selected =

      this.form.get(
        rule.key
      )?.value || false;

  });

}
  goBack(): void {

    this.backStep.emit();

  }

  submit(): void {

  let hasError = false;

  // CLEANING POLICY

  if (
    !this.form.get(
      'cleaningPolicyType'
    )?.value
  ) {

    this.form.get(
      'cleaningPolicyType'
    )?.setErrors({
      required: true
    });

    hasError = true;

  }

  // CANCELLATION POLICY

  if (
    !this.form.get(
      'cancellationPolicyType'
    )?.value
  ) {

    this.form.get(
      'cancellationPolicyType'
    )?.setErrors({
      required: true
    });

    hasError = true;

  }

  // ADDITIONAL RULES

  const additionalRules =
    this.form.get(
      'additionalHouseRules'
    );

  if (
    !additionalRules?.value ||
    !additionalRules.value.trim()
  ) {

    additionalRules?.setErrors({
      required: true
    });

    additionalRules?.markAsTouched();

    hasError = true;

  }

  if (hasError)
    return;

  this.submitForm.emit();

}
saveAsDraft(): void {

  this.saveDraft.emit();

}
  ngAfterViewChecked(): void {

    createIcons({
      icons
    });

  }

  selectCleaningPolicy(
    type: number
  ): void {

    this.selectedCleaningPolicy =
      type;

    let policyType = '';

    switch (type) {

      case 1:

        policyType =
          'IncludedInPrice';

        break;

      case 2:

        policyType =
          'AdditionalFee';

        break;

      case 3:

        policyType =
          'GuestResponsible';

        break;

    }

    this.form.patchValue({

      cleaningPolicyType:
        policyType

    });

  }

  selectCancellationPolicy(
    type: number
  ): void {

    this.selectedCancellationPolicy =
      type;

    let cancellationType = '';

    switch (type) {

      case 1:

        cancellationType =
          'Flexible';

        break;

      case 2:

        cancellationType =
          'Moderate';

        break;

      case 3:

        cancellationType =
          'Strict';

        break;

    }

    this.form.patchValue({

      cancellationPolicyType:
        cancellationType

    });

  }

  toggleRule(rule: any): void {

    rule.selected =
      !rule.selected;

    this.form.patchValue({

      [rule.key]:
        rule.selected

    });

  }

}