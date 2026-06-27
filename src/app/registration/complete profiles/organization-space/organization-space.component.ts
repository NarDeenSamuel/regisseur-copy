import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { countries } from '../../../shared/countries';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-organization-space',
  imports:[NavbarComponent,CommonModule,ReactiveFormsModule,SideBarComponent],
  templateUrl: './organization-space.component.html',
  styleUrl: './organization-space.component.css'
})
export class OrganizationSpaceComponent implements OnInit  {
isLoading = false;

ngOnInit(): void {

  this.profilePhotoPreview = '';

  this.bannerPreview = '';

  this.galleryPreviews = [];

  this.aboutFile = null;
  this.profileForm.patchValue({
    country: 'US'
  });

  const usa = this.allCountries.find(
    country => country.code === 'US'
  );

  this.states = usa?.states || [];
    // Get User From LocalStorage
  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  this.profileForm.patchValue({
    organizationEmail: user.email || ''
  });
   this.profileForm.patchValue({
    firstName: user.firstName || ''
  });
   this.profileForm.patchValue({
    lastName: user.lastName || ''
  });
   this.profileForm.patchValue({
    city: user.city || ''
  });
   this.profileForm.patchValue({
    country: user.country || ''
  });
     this.profileForm.patchValue({
    organizationName: user.organizationName || ''
  });

}
  profileForm: FormGroup;

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
  showCountryDropdown = false;

selectedCountry = {
  name: 'United States',
  code: '+1',
  flag: 'assets/flags/us.svg'
};
toggleCountryDropdown(): void {

  this.showCountryDropdown =
    !this.showCountryDropdown;

}
selectCountry(country: any): void {

  this.selectedCountry = country;

  this.showCountryDropdown = false;

}
  allLanguages: string[] = [

    'English',
    'Arabic',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese',
    'Japanese',
    'Korean',
    'Turkish',
    'Hindi',
    'Urdu',
    'Dutch',
    'Greek',
    'Polish',
    'Swedish',
    'Norwegian',
    'Danish'

  ];
showSkillsDropdown = false;

showCustomTagInput = false;

selectedSkills: string[] = [];

allSkills = [
  'Community Sports',
  'Recreation Center',
  'Public Facility',
  'Youth Programs',
  'Indoor Courts',
  'Outdoor Field',
  'Community Events',
  'Fitness',
  'Accessible Venue',
  'Nonprofit',
  'Multipurpose Hall',
  'Sports Training',
  'After School Programs',
  'Senior Programs',
  'Adaptive Sports',
  'Pickleball',
  'Swim Programs',
  'Team Sports',
  'Wellness Programs',
  'Parking'
];

suggestedTags = [
  'After School Programs',
  'Senior Programs',
  'Adaptive Sports',
  'Pickleball',
  'Swim Programs',
  'Team Sports',
  'Wellness Programs',
  'Parking'
];
removeProfilePhoto(): void {

  this.profilePhoto = null;

  this.profilePhotoPreview = null;

  this.profileForm.patchValue({
    avatar: null
  });

}
selectSkill(skill: string): void {

  if (
    skill &&
    !this.selectedSkills.includes(skill)
  ) {

    this.selectedSkills.push(skill);

  }

  this.showSkillsDropdown = false;

}

removeSkill(skill: string): void {

  this.selectedSkills =
    this.selectedSkills.filter(
      item => item !== skill
    );

}

addCustomTag(tag: string): void {

  const value = tag.trim();

  if (
    value &&
    !this.selectedSkills.includes(value)
  ) {

    this.selectedSkills.push(value);

  }

}
  constructor(
    private fb: FormBuilder,
      private profileService: ProfileService,
  private router: Router
  ) {

   this.profileForm = this.fb.group({

  // Step 1
organizationName: ['', Validators.required],
organizationEmail: [
  { value: '', disabled: true },
  [Validators.required, Validators.email]
],
organizationPhone: ['', Validators.required],
displayName: [''],
headline: [''],
primaryContactName: [''],
  // Step 2

facilityCategory: ['', Validators.required],
venueType: ['', Validators.required],
parentOrganizationName: [''],
bio: ['', Validators.required],
amenities: [''],
capacityRange: ['', Validators.required],
bookingHours: ['', Validators.required],
  // Step 3

  website: [''],
  instagram: [''],
  facebook: [''],
  linkedin: [''],
  twitter: [''],
  tiktok: [''],
  youtube: [''],
  additionalLink: [''],

  // Step 4

  country: ['US'],
  city: [''],
  region: [''],
  address: [''],
  postalCode: [''],
  preferredAreas: [[]],

  // Step 5

  avatar: [null],
  banner: [null],
  gallery: [[]],
  aboutFile: [null],

  // Step 6
allowBookingRequests: [true],
showProfilePublicly: [true],
receivePlatformUpdates: [true],
showSocialLinks: [true],
preferredContactMethod: ['Email'],
publicContactEmail: [''],
  // Step 7

  skills: [[]]

});

  }




showAreaDropdown = false;

selectedAreas: string[] = [];

allAreas: string[] = [

  'Downtown',
  'Hollywood',
  'Beverly Hills',
  'Santa Monica',
  'Pasadena',
  'Long Beach',
  'West Hollywood',
  'Silver Lake',
  'East Hollywood',
  'Venice',
  'Anaheim',
  'Orange County',
  'Brooklyn',
  'Manhattan',
  'Queens',
  'Cairo',
  'Alexandria',
  'Nasr City',
  'New Cairo',
  'Zamalek'

];
allCountries = countries;

states: string[] = [];
onCountryChange(event: Event): void {

  const code =
    (event.target as HTMLSelectElement).value;

  const selectedCountry =
    this.allCountries.find(
      country => country.code === code
    );

  this.states =
    selectedCountry?.states || [];

}
selectArea(area: string): void {

  if (
    area &&
    !this.selectedAreas.includes(area)
  ) {

    this.selectedAreas.push(area);

  }

  this.showAreaDropdown = false;

}

removeArea(area: string): void {

  this.selectedAreas =
    this.selectedAreas.filter(
      item => item !== area
    );

}

profilePhoto: File | null = null;
profilePhotoPreview: string | null = null;

bannerImage: File | null = null;
bannerPreview: string | null = null;

galleryFiles: File[] = [];
galleryPreviews: string[] = [];

aboutFile: File | null = null;
aboutFileName = '';
aboutFileSize = '';
onProfilePhotoChange(event: Event): void {

  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  this.profilePhoto = file;

  const reader = new FileReader();

  reader.onload = () => {

    this.profilePhotoPreview =
      reader.result as string;

  };

  reader.readAsDataURL(file);
this.profileForm.patchValue({
  avatar: file
});
}

onBannerChange(event: Event): void {

  const file =
    (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  this.bannerImage = file;

  this.profileForm.patchValue({
    banner: file
  });

  const reader = new FileReader();

  reader.onload = () => {

    this.bannerPreview =
      reader.result as string;

  };

  reader.readAsDataURL(file);

}

onGalleryChange(event: Event): void {

  const files =
    Array.from(
      (event.target as HTMLInputElement).files || []
    );

  files.forEach(file => {

    this.galleryFiles.push(file);

    const reader = new FileReader();

    reader.onload = () => {

      this.galleryPreviews.push(
        reader.result as string
      );

    };

    reader.readAsDataURL(file);

  });

}

removeGalleryImage(index: number): void {

  this.galleryFiles.splice(index, 1);

  this.galleryPreviews.splice(index, 1);

}

onAboutFileChange(event: Event): void {

  const file =
    (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  this.aboutFile = file;

  this.aboutFileName = file.name;

  this.aboutFileSize =
    (file.size / 1024 / 1024).toFixed(1) + ' MB';
    this.profileForm.patchValue({
  aboutFile: file
});

}


removeBanner(): void {

  this.bannerImage = null;

  this.bannerPreview = null;

  this.profileForm.patchValue({
    banner: null
  });

}
removeAboutFile(): void {

  this.aboutFile = null;

  this.aboutFileName = '';

  this.aboutFileSize = '';

}



validationMessage = '';
successMessage = '';
getMissingFields(): string[] {

  const form =
    this.profileForm.getRawValue();

  const fields = [];

  if (!form.organizationName)
    fields.push('Organization Name');

  if (!form.organizationEmail)
    fields.push('Organization Email');

  if (!form.organizationPhone)
    fields.push('Organization Phone');

  if (!form.facilityCategory)
    fields.push('Facility Category');

  if (!form.venueType)
    fields.push('Venue Type');

  if (!form.bio)
    fields.push('Profile Summary');

  if (!form.capacityRange)
    fields.push('Capacity Range');

  if (!form.bookingHours)
    fields.push('Availability Hours');

  if (!form.country)
    fields.push('Country');

  if (!form.city)
    fields.push('City');

  if (!form.preferredContactMethod)
    fields.push('Preferred Contact Method');

  return fields;

}
buildPayload(isDraft: boolean) {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const form =
    this.profileForm.getRawValue();

  return {

    userId: user.id,

    isDraft: isDraft,

    organizationName:
      form.organizationName || '',

    organizationEmail:
      form.organizationEmail || '',

    organizationPhone:
      this.selectedCountry.code +
      (form.organizationPhone || ''),

    displayBrandName:
      form.displayName || '',

    tagline:
      form.headline || '',

    facilityCategory:
      form.facilityCategory || '',

    venueType:
      form.venueType || '',

    parentOrganizationName:
      form.parentOrganizationName || '',

    profileSummary:
      form.bio || '',

    capacityRange:
      form.capacityRange || '',

    availabilityHours:
      form.bookingHours || '',

    amenities:
      form.amenities
        ? form.amenities
            .split(',')
            .map((x: string) => x.trim())
        : [],

    websiteUrl:
      form.website || '',

    instagramUrl:
      form.instagram || '',

    facebookUrl:
      form.facebook || '',

    linkedinUrl:
      form.linkedin || '',

    twitterUrl:
      form.twitter || '',

    tikTokUrl:
      form.tiktok || '',

    youtubeUrl:
      form.youtube || '',

    additionalLinkUrl:
      form.additionalLink || '',

    country:
      form.country || '',

    city:
      form.city || '',

    state:
      form.region || '',

    address:
      form.address || '',

    postalCode:
      form.postalCode || '',

    coverageAreas:
      this.selectedAreas,

    preferredContactMethod:
      form.preferredContactMethod || '',

    publicBookingEmail:
      form.publicContactEmail || '',

    allowBookingRequests:
      form.allowBookingRequests,

    showProfilePublicly:
      form.showProfilePublicly,

    receivePlatformUpdates:
      form.receivePlatformUpdates,

    showSocialLinks:
      form.showSocialLinks,

    spaceTags:
      this.selectedSkills,

    logoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    bannerUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    venueDeckUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    galleryUrls: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    ]

  };

}



submitForm(isDraft: boolean = false): void {
  console.log('IS DRAFT =', isDraft);
  if (!isDraft) {

    const missingFields =
      this.getMissingFields();

    if (missingFields.length) {

      this.validationMessage =
        'Please complete the following fields: ' +
        missingFields.join(', ');

      return;

    }

  }

  this.isLoading = true;

  this.validationMessage = '';

  const payload =
    this.buildPayload(isDraft);

    console.log('PAYLOAD');
console.log(payload);
  this.profileService
    .completeSpaceProfile(payload)
    .subscribe({

      next: () => {

        this.isLoading = false;

        if (isDraft) {
      console.log('SUCCESS');

          this.router.navigate([
            '//organization-space-step-2'
          ]);

        } else {

          this.router.navigate([
            '/organization-space-step-2'
          ]);

        }

      },

      error: (err) => {
      console.log('ERROR');

        this.isLoading = false;

        console.error(err);

        console.log('FULL ERROR', err);

        console.log(
          'ERRORS',
          err.error?.errors
        );

        console.log(
          'RESPONSE',
          err.error
        );

        this.validationMessage =
          isDraft
            ? 'Failed to save draft'
            : 'Failed to save profile';

      }

    });

}

}
