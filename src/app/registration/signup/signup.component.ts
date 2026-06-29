import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { countries } from '../../shared/countries';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {


isLoading = false;

  // Dependencies Injection
remainingSeconds = 900; // 15 min
otpErrorMessage = '';
timer: any;
registerErrorMessage = '';
canResendOtp = false;
registerPayload: any = null;
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  // Form Property
  signUpForm!: FormGroup;

  // Static Data
  allCountries = countries;
  states: string[] = [];
  showPassword = false;
  showConfirmPassword = false;
  activeDropdown: string | null = null;
  showCountryDropdown = false;

 selectedUserType = 'Individual';
selectedRole = '';

  userTypes = ['Individual', 'Business', 'Organization'];

  roles = [
    { name: 'Artist & Talent', allowedFor: ['Individual'] },
    { name: 'Producer / Organizer', allowedFor: ['Individual'] },
    { name: 'Vendor', allowedFor: ['Business'] },
    { name: 'Service Provider', allowedFor: ['Business'] },
    { name: 'Space / Venue', allowedFor: ['Business', 'Organization'] }
  ];
clearRole() {

  this.selectedRole = '';

  this.signUpForm.patchValue({
    primaryRole: ''
  });

}
  countries = [
    { name: 'United States', code: '+1', flag: 'assets/flags/us.svg' },
    { name: 'Egypt', code: '+20', flag: 'assets/flags/eg.svg' },
    { name: 'Saudi Arabia', code: '+966', flag: 'assets/flags/sa.svg' },
    { name: 'United Arab Emirates', code: '+971', flag: 'assets/flags/ae.svg' },
    { name: 'United Kingdom', code: '+44', flag: 'assets/flags/gb.svg' },
    { name: 'France', code: '+33', flag: 'assets/flags/fr.svg' },
    { name: 'Germany', code: '+49', flag: 'assets/flags/de.svg' },
    { name: 'Italy', code: '+39', flag: 'assets/flags/it.svg' },
    { name: 'Spain', code: '+34', flag: 'assets/flags/es.svg' },
    { name: 'Canada', code: '+1', flag: 'assets/flags/ca.svg' },
    { name: 'Brazil', code: '+55', flag: 'assets/flags/br.svg' },
    { name: 'Argentina', code: '+54', flag: 'assets/flags/ar.svg' },
    { name: 'Mexico', code: '+52', flag: 'assets/flags/mx.svg' },
    { name: 'India', code: '+91', flag: 'assets/flags/in.svg' },
    { name: 'China', code: '+86', flag: 'assets/flags/cn.svg' },
    { name: 'Japan', code: '+81', flag: 'assets/flags/jp.svg' },
    { name: 'South Korea', code: '+82', flag: 'assets/flags/kr.svg' },
    { name: 'Turkey', code: '+90', flag: 'assets/flags/tr.svg' },
    { name: 'Russia', code: '+7', flag: 'assets/flags/ru.svg' },
    { name: 'Australia', code: '+61', flag: 'assets/flags/au.svg' },
    { name: 'South Africa', code: '+27', flag: 'assets/flags/za.svg' },
    { name: 'Qatar', code: '+974', flag: 'assets/flags/qa.svg' },
    { name: 'Kuwait', code: '+965', flag: 'assets/flags/kw.svg' },
    { name: 'Bahrain', code: '+973', flag: 'assets/flags/bh.svg' },
    { name: 'Oman', code: '+968', flag: 'assets/flags/om.svg' },
    { name: 'Jordan', code: '+962', flag: 'assets/flags/jo.svg' },
    { name: 'Lebanon', code: '+961', flag: 'assets/flags/lb.svg' },
    { name: 'Morocco', code: '+212', flag: 'assets/flags/ma.svg' },
    { name: 'Tunisia', code: '+216', flag: 'assets/flags/tn.svg' },
    { name: 'Algeria', code: '+213', flag: 'assets/flags/dz.svg' }
  ];

  // Selected Country Properties
  businessCountry = this.countries[0];
  contactCountry = this.countries[0];
  selectedCountry = this.countries[0];
  organizationCountry = this.countries[0];
showValidationMessage = false;
  constructor(private authService: AuthService) {
    this.initForm();
  }

  ngOnInit() {
    this.signUpForm.patchValue({ country: 'US' });
    this.onCountrySelected('US');

    // الاستماع للتغييرات مع حماية الـ Memory Leak باستخدام takeUntilDestroyed
    this.signUpForm.get('country')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(code => {
        this.onCountrySelected(code);
        this.signUpForm.patchValue({ region: '' }, { emitEvent: false });
      });

  }
numbersOnly(event: KeyboardEvent): void {

  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab'
  ];

  if (
    allowedKeys.includes(event.key)
  ) {
    return;
  }

  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }

}
 get currentFormKey(): string {

  if (!this.selectedRole) {
    return this.selectedUserType;
  }

  return `${this.selectedUserType}-${this.selectedRole}`;
}

  // Form Initialization
  private initForm() {
    this.signUpForm = this.fb.group({
      /* COMMON */
      userType: ['Individual'],
      primaryRole: [''],
      firstName: [''],
      lastName: [''],
      email: [
  '',
  [
    Validators.required,
    Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )
  ]
],
      countryCode: ['+1'],
      phone: [''],
        producerType: ['2', Validators.required],

      country: ['US'],
      city: [''],
      region: [''],
      address: [''],
      postalCode: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      referralCode: [''],
      receiveUpdates: [true],
      receiveNews: [false],
      acceptTerms: [false, Validators.requiredTrue],

      /* ARTIST */
      displayName: [''],
      talentCategory: [''],
      portfolioLink: [''],
      acceptDirectBooking: [false],
      summary: [''],
      coverageArea: [''],

      /* ORGANIZER */
      brandName: [''],
      eventType: [''],
      organizerSummary: [''],
      acceptProjectRequests: [false],

      /* BUSINESS */
      companyName: [''],
      businessEmail: [
  '',
  [
    Validators.required,
    Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )
  ]
],
      businessPhone: [''],
      businessCountryCode: ['+1'],
      businessWebsite: [''],
      taxId: [''],

      /* VENDOR / SERVICE */
      serviceCompanyName: [''],
      serviceCategory: [''],
      acceptVendorRequests: [false],
      acceptServiceInquiries: [false],
      businessSummary: [''],

      /* CONTACT */
      contactFirstName: [''],
      contactLastName: [''],
     contactEmail: [
  '',
  [
    Validators.required,
    Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )
  ]
],

      contactPhone: [''],
      contactCountryCode: ['+1'],

      /* VENUE */
      venueName: [''],
      venueType: [''],
      capacity: [''],

      /* ORGANIZATION */
      organizationName: [''],
     organizationEmail: [
  '',
  [
    Validators.required,
    Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )
  ]
],
      organizationPhone: [''],
      organizationWebsite: [''],
      organizationTaxId: [''],
      organizationSpaceName: [''],
      organizationType: [''],
      organizationSummary: ['']
    });
  }

  // UI & Icons Methods
  getUserTypeIcon(type: string): string {
    switch (type) {
      case 'Individual': return 'fa-solid fa-user-tie';
      case 'Business': return 'fa-solid fa-briefcase';
      case 'Organization': return 'fa-solid fa-landmark';
      default: return 'fa-regular fa-user';
    }
  }

  getRoleIcon(roleName: string): string {
    switch (roleName) {
      case 'Artist & Talent': return 'fa-solid fa-masks-theater';
      case 'Producer / Organizer': return 'fa-solid fa-calendar-days';
      case 'Vendor': return 'fa-solid fa-shop';
      case 'Service Provider': return 'fa-solid fa-screwdriver-wrench';
      case 'Space / Venue': return 'fa-solid fa-building';
      default: return 'fa-regular fa-circle';
    }
  }

  // Selection Logic
  selectUserType(type: string) {
    this.selectedUserType = type;
    this.signUpForm.patchValue({ userType: type });

  if (type === 'Individual') {

  this.selectedRole = '';

} else if (type === 'Business') {

  this.selectedRole = 'Vendor';

} else if (type === 'Organization') {

  this.selectedRole = 'Space / Venue';

}

    this.signUpForm.patchValue({ primaryRole: this.selectedRole });
  }

  isRoleLocked(role: any): boolean {
    return !role.allowedFor.includes(this.selectedUserType);
  }

  selectRole(role: any) {
    if (this.isRoleLocked(role)) return;

    this.selectedRole = role.name;
    this.signUpForm.patchValue({ primaryRole: role.name });
  }

  // Toggles
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleDropdown(type: string) {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

  toggleCountryDropdown() {
    this.showCountryDropdown = !this.showCountryDropdown;
  }

  // Country Selection Methods
  selectCountry(country: any) {
    this.selectedCountry = country;
    this.signUpForm.patchValue({ countryCode: country.code });
    this.activeDropdown = null;
  }

  selectOrganizationCountry(country: any) {
    this.organizationCountry = country;
    this.activeDropdown = null;
  }

  selectBusinessCountry(country: any) {
    this.businessCountry = country;
    this.signUpForm.patchValue({ businessCountryCode: country.code });
    this.activeDropdown = null;
  }

  selectContactCountry(country: any) {
    this.contactCountry = country;
    this.signUpForm.patchValue({ contactCountryCode: country.code });
    this.activeDropdown = null;
  }

  onCountrySelected(code: string): void {
    const country = this.allCountries.find(c => c.code === code);
    this.states = country?.states ?? [];
  }
isValidEmail(email: string): boolean {

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);

}
  // Form Submission
submitForm(): void {

  this.showValidationMessage = false;

 if (!this.validateCurrentForm()) {

  this.showValidationMessage = true;

  if (!this.registerErrorMessage) {

    this.registerErrorMessage =
      'Please fill in all required fields.';

  }

  return;

}

  const data = this.signUpForm.getRawValue();

  const payload: any = {

    userType: this.getUserTypeValue(this.selectedUserType),

    password: data.password,
    confirmPassword: data.confirmPassword,

    referralCode: data.referralCode || '',

    receivePlatformUpdates: data.receiveUpdates ?? false,

    receiveMarketingEmails: data.receiveNews ?? false,

    country: data.country || '',
    city: data.city || '',
    state: data.region || '',
    address: data.address || '',
    postalCode: data.postalCode || ''
  };

  const primaryRole = this.getPrimaryRoleValue(this.selectedRole);

  if (this.selectedRole && primaryRole) {
    payload.primaryRole = primaryRole;
  }

  switch (this.currentFormKey) {

    case 'Individual':

      Object.assign(payload, {

        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${this.selectedCountry.code}${data.phone}`,
        displayName: data.displayName || '',
        companyName: data.companyName || '',
        profileSummary: data.summary || '',
        bio: data.summary || ''
      });

      break;

    case 'Individual-Artist & Talent':

      Object.assign(payload, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${this.selectedCountry.code}${data.phone}`,

        professionalName: data.displayName || '',
        displayName: data.displayName || '',

        talentCategory: data.talentCategory || '',

        portfolioLink: data.portfolioLink || '',

        acceptDirectBookingRequests:
          data.acceptDirectBooking ?? false,

        profileSummary: data.summary || '',
        bio: data.summary || '',

        coverageAreas:
          data.coverageArea
            ? [data.coverageArea]
            : []
      });

      break;

    case 'Individual-Producer / Organizer':

      Object.assign(payload, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: `${this.selectedCountry.code}${data.phone}`,

        brandName: data.brandName || '',

        eventTypeSpecialty:
          data.eventType || '',

        companyName:
          data.companyName || '',

        profileSummary:
          data.organizerSummary || '',

        bio:
          data.organizerSummary || '',

        coverageAreas:
          data.coverageArea
            ? [data.coverageArea]
            : []
      });

      break;

    case 'Business-Vendor':

      Object.assign(payload, {

        companyName:
          data.companyName || '',

        email:
          data.businessEmail || '',

        phone:
          `${this.businessCountry.code}${data.businessPhone}`,

        websiteUrl:
          data.businessWebsite || '',

        registrationTaxId:
          data.taxId || '',

        entityName:
          data.serviceCompanyName || '',

        serviceCategory:
          data.serviceCategory || '',

        summary:
          data.businessSummary || '',

         FirstName:
    data.contactFirstName || '',

  LastName:
    data.contactLastName || '',

        primaryContactEmail:
          data.contactEmail || '',

        primaryContactPhone:
          `${this.contactCountry.code}${data.contactPhone}`,

        contactEmail:
          data.contactEmail || '',

        contactPhone:
          `${this.contactCountry.code}${data.contactPhone}`
      });

      break;

    case 'Business-Service Provider':

      Object.assign(payload, {

        companyName:
          data.companyName || '',

        email:
          data.businessEmail || '',

        phone:
          `${this.businessCountry.code}${data.businessPhone}`,

        websiteUrl:
          data.businessWebsite || '',

        registrationTaxId:
          data.taxId || '',

        entityName:
          data.serviceCompanyName || '',

        serviceCategory:
          data.serviceCategory || '',

        summary:
          data.businessSummary || '',

        FirstName:
          data.contactFirstName || '',

        primaryContactLastName:
          data.contactLastName || '',

       LastName:
          data.contactEmail || '',

        primaryContactPhone:
          `${this.contactCountry.code}${data.contactPhone}`,

        contactEmail:
          data.contactEmail || '',

        contactPhone:
          `${this.contactCountry.code}${data.contactPhone}`
      });

      break;

    case 'Business-Space / Venue':

  Object.assign(payload, {

    FirstName:
      data.contactFirstName || '',

    LastName:
      data.contactLastName || '',

    companyName:
      data.companyName || '',

    email:
      data.businessEmail || '',

    phone:
      `${this.businessCountry.code}${data.businessPhone}`,

    websiteUrl:
      data.businessWebsite || '',

    registrationTaxId:
      data.taxId || '',

    entityName:
      data.venueName || '',

    venueName:
      data.venueName || '',

    venueType:
      data.venueType || '',

    capacity:
      Number(data.capacity) || 0,

    summary:
      data.businessSummary || '',

    primaryContactFirstName:
      data.contactFirstName || '',

    primaryContactLastName:
      data.contactLastName || '',

    primaryContactEmail:
      data.contactEmail || '',

    primaryContactPhone:
      `${this.contactCountry.code}${data.contactPhone}`,

    contactEmail:
      data.contactEmail || '',

    contactPhone:
      `${this.contactCountry.code}${data.contactPhone}`

  });

  break;

      break;

    case 'Organization-Space / Venue':

      Object.assign(payload, {

        companyOrganizationName:
          data.organizationName || '',

        email:
          data.organizationEmail || '',

        phone:
          `${this.organizationCountry.code}${data.organizationPhone}`,

        websiteUrl:
          data.organizationWebsite || '',

        registrationTaxId:
          data.organizationTaxId || '',

        entityName:
          data.organizationSpaceName || '',

        summary:
          data.organizationSummary || '',

        FirstName:
          data.contactFirstName || '',

        LastName:
          data.contactLastName || '',

        primaryContactEmail:
          data.contactEmail || '',

        primaryContactPhone:
          `${this.contactCountry.code}${data.contactPhone}`,

        contactEmail:
          data.contactEmail || '',

        contactPhone:
          `${this.contactCountry.code}${data.contactPhone}`
      });

      break;
  }

  console.log('CURRENT FORM:', this.currentFormKey);
  console.log('ROLE:', this.selectedRole);
  console.log(JSON.stringify(payload, null, 2));

  this.registerPayload = payload;

  this.register();
}
private validateCurrentForm(): boolean {

  const data = this.signUpForm.controls;

  switch (this.currentFormKey) {
case 'Individual':
 if (
  data['email'].value &&
  !this.isValidEmail(
    data['email'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid email address';

  return false;

}
  return !!(
    data['firstName'].value &&
    data['lastName'].value &&
    data['email'].value &&
    data['phone'].value &&
    data['country'].value &&
    data['city'].value &&
    data['address'].value &&
    data['postalCode'].value &&
    data['password'].value &&
    data['confirmPassword'].value &&
    data['acceptTerms'].value
  );
    case 'Individual-Artist & Talent':
if (
  data['email'].value &&
  !this.isValidEmail(
    data['email'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid email address';

  return false;

}
      return !!(
        data['firstName'].value &&
        data['lastName'].value &&
        data['email'].value &&
        data['phone'].value &&
        data['talentCategory'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    case 'Individual-Producer / Organizer':
 if (
  data['email'].value &&
  !this.isValidEmail(
    data['email'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid email address';

  return false;

}
      return !!(
        data['firstName'].value &&
        data['lastName'].value &&
        data['email'].value &&
        data['phone'].value &&
        data['eventType'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    case 'Business-Vendor':
if (
  data['contactEmail'].value &&
  !this.isValidEmail(
    data['contactEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid contact email address';

  return false;

}
if (
  data['businessEmail'].value &&
  !this.isValidEmail(
    data['businessEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid business email address';

  return false;

}
  return !!(
        data['companyName'].value &&
        data['businessEmail'].value &&
        data['businessPhone'].value &&
        data['contactFirstName'].value &&
        data['contactLastName'].value &&
        data['contactEmail'].value &&
        data['contactPhone'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    case 'Business-Service Provider':
if (
  data['contactEmail'].value &&
  !this.isValidEmail(
    data['contactEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid contact email address';

  return false;

}
if (
  data['businessEmail'].value &&
  !this.isValidEmail(
    data['businessEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid business email address';

  return false;

}
      return !!(
        data['companyName'].value &&
        data['businessEmail'].value &&
        data['businessPhone'].value &&
        data['contactFirstName'].value &&
        data['contactLastName'].value &&
        data['contactEmail'].value &&
        data['contactPhone'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    case 'Business-Space / Venue':
if (
  data['businessEmail'].value &&
  !this.isValidEmail(
    data['businessEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid business email address';

  return false;

}
if (
  data['contactEmail'].value &&
  !this.isValidEmail(
    data['contactEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid contact email address';

  return false;

}
      return !!(
        data['companyName'].value &&
        data['businessEmail'].value &&
        data['businessPhone'].value &&
        data['venueType'].value &&
        data['contactFirstName'].value &&
        data['contactLastName'].value &&
        data['contactEmail'].value &&
        data['contactPhone'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    case 'Organization-Space / Venue':
if (
  data['contactEmail'].value &&
  !this.isValidEmail(
    data['contactEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid contact email address';

  return false;

}
if (
  data['organizationEmail'].value &&
  !this.isValidEmail(
    data['organizationEmail'].value
  )
) {

  this.registerErrorMessage =
    'Please enter a valid organization email address';

  return false;

}
      return !!(
        data['organizationName'].value &&
        data['organizationEmail'].value &&
        data['organizationPhone'].value &&
        data['organizationType'].value &&
        data['contactFirstName'].value &&
        data['contactLastName'].value &&
        data['contactEmail'].value &&
        data['contactPhone'].value &&
        data['country'].value &&
        data['city'].value &&
        data['address'].value &&
        data['postalCode'].value &&
        data['password'].value &&
        data['confirmPassword'].value &&
        data['acceptTerms'].value
      );

    default:
      return false;
  }

}
getUserTypeValue(type: string): number {

  switch (type) {

    case 'Individual':
      return 1;

    case 'Business':
      return 2;

    case 'Organization':
      return 3;

    default:
      return 1;
  }
}
getPrimaryRoleValue(role: string): number | null {

  switch (role) {

    case 'Artist & Talent':
      return 1;

    case 'Producer / Organizer':
      return Number(this.signUpForm.get('producerType')?.value);

    case 'Vendor':
      return 4;

    case 'Service Provider':
      return 5;

    case 'Space / Venue':
      return 6;

    default:
      return null;
  }
}
passwordsMatch(): boolean {

  return (
    this.signUpForm.get('password')?.value ===
    this.signUpForm.get('confirmPassword')?.value
  );
}
isOtpModalOpen = false;
otp = '';
registeredEmail = '';
verifyOtp() {

 this.otpErrorMessage = '';

  const email =
    this.registerPayload?.email ||
    this.signUpForm.value.email ||
    this.signUpForm.value.businessEmail ||
    this.signUpForm.value.organizationEmail;

  const payload = {
    email,
    otp: this.otp
  };

  console.log(payload);

  this.authService.verifyOtp(payload).subscribe({

    next: (response) => {

      this.isOtpModalOpen = false;

      this.router.navigate([
        '/registration/signin'
      ]);

    },
error: (error) => {

  const errorText =
    JSON.stringify(error);

  if (
    errorText.includes('Invalid OTP')
  ) {

    this.otpErrorMessage =
      'Wrong OTP code';

  } else {

    this.otpErrorMessage =
      'Verification failed';

  }

}

  });

}
register() {

  if (!this.passwordsMatch()) {

    alert('Passwords do not match');
    return;

  }

  if (!this.registerPayload) {

    return;

  }
this.isLoading = true;

  this.authService.signUp(this.registerPayload).subscribe({

    next: (response) => {

      this.isLoading = false;

      console.log('Registration successful', response);

      this.isOtpModalOpen = true;
        this.startOtpTimer();


    },

 error: (error) => {
      this.isLoading = false;
  this.showValidationMessage = true;

  console.log(error);

  const errorMessage =
    error?.error?.toString?.() ||
    JSON.stringify(error);

  if (
    errorMessage.includes(
      'User with this email already exists'
    )
  ) {

    this.registerErrorMessage =
      'This email is already registered';

  }

  else {

    this.registerErrorMessage =
      'Registration failed. Please try again';

  }

}

  });

}
get formattedTime(): string {

  const minutes = Math.floor(
    this.remainingSeconds / 60
  );

  const seconds =
    this.remainingSeconds % 60;

  return `${minutes
    .toString()
    .padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
startOtpTimer() {

  clearInterval(this.timer);

  this.remainingSeconds = 900;

  this.canResendOtp = false;

  this.timer = setInterval(() => {

    if (this.remainingSeconds > 0) {

      this.remainingSeconds--;

    } else {

      clearInterval(this.timer);

      this.canResendOtp = true;

    }

  }, 1000);

}
resendOtp() {

  this.authService
    .resendOtp(
      this.signUpForm.value.email
    )
    .subscribe({

      next: () => {

        this.startOtpTimer();

      },

      error: (error) => {

        console.error(error);

      }

    });

}

}
