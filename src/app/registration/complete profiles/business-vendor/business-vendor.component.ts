import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { countries } from '../../../shared/countries';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-business-vendor',
  imports:[NavbarComponent,CommonModule,ReactiveFormsModule,SideBarComponent],
  templateUrl: './business-vendor.component.html',
  styleUrl: './business-vendor.component.css'
})
export class BusinessVendorComponent implements OnInit  {
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
    businessEmail: user.email || ''
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
    companyName: user.companyName || ''
  });
      this.profileForm.patchValue({
    brandName: user.brandName || ''
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

  'Event Rentals',
  'Décor',
  'Weddings',
  'Furniture',
  'Floral Styling',
  'Brand Activations',
  'Tabletop',
  'Lighting',
  'Backdrops',
  'Lounge Furniture',
  'Tent Rentals',
  'Corporate Events',
  'Custom Installations',
  'Event Design',
  'Luxury Events',
  'Private Events'

];
suggestedTags = [

  'Venue Sourcing',
  'Budget Management',
  'Contract Negotiation',
  'Risk Management',
  'On-Site Operations',
  'Artist Liaison',
  'Marketing & Promotion',
  'Ticketing'

];

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
){

   this.profileForm = this.fb.group({

  // Step 1

companyName: ['', Validators.required],
businessEmail: [
  { value: '', disabled: true },
  [Validators.required, Validators.email]
],
businessPhone: ['', Validators.required],

displayName: [''],
headline: [''],
primaryContactName: [''],
  // Step 2

 vendorCategory: ['', Validators.required],
bio: ['', Validators.required],
serviceAreaFocus: [''],
yearsInBusiness: ['', Validators.required],
workingHours: ['', Validators.required],
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

allowVendorInquiries: [true],
showProfilePublicly: [true],
receivePlatformUpdates: [true],
showSocialLinks: [true],

preferredContactMethod: [
  '',
  Validators.required
],

publicContactEmail: [''],
  // Step 7

  skills: [[]]

});

  }


getMissingFields(): string[] {

  const missing: string[] = [];

  const requiredFields = [

    { key: 'companyName', label: 'Company Name' },
    { key: 'businessEmail', label: 'Business Email' },
    { key: 'businessPhone', label: 'Business Phone' },
    { key: 'vendorCategory', label: 'Vendor Category' },
    { key: 'bio', label: 'Profile Summary / Bio' },
    { key: 'yearsInBusiness', label: 'Years In Business' },
    { key: 'workingHours', label: 'Availability Working Hours' },
    { key: 'country', label: 'Country' },
    { key: 'city', label: 'City' },
    { key: 'preferredContactMethod', label: 'Preferred Contact Method' }

  ];

  requiredFields.forEach(field => {

    const value =
      this.profileForm.get(field.key)?.value;

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {

      missing.push(field.label);

    }

  });

  return missing;

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

removeProfilePhoto(): void {

  this.profilePhoto = null;

  this.profilePhotoPreview = null;

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
submitForm(isDraft: boolean = false): void {

  if (!isDraft) {

    const missingFields =
      this.getMissingFields();

    if (missingFields.length > 0) {

      this.successMessage = '';

      this.validationMessage =
        'Please complete the following fields: ' +
        missingFields.join(', ');

      return;

    }

  }

  this.isLoading = true;

  this.validationMessage = '';

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const payload = {

    userId: user.id,

    isDraft: isDraft,

    companyName:
      this.profileForm.value.companyName,

    phone:
      this.selectedCountry.code +
      (this.profileForm.value.businessPhone || ''),

    bio:
      this.profileForm.value.bio || '',

    country:
      this.profileForm.value.country || '',

    city:
      this.profileForm.value.city || '',

    state:
      this.profileForm.value.region || '',

    address:
      this.profileForm.value.address || '',

    postalCode:
      this.profileForm.value.postalCode || '',

    vendorCategory:
      this.profileForm.value.vendorCategory || '',

    companyOrganizationName:
      this.profileForm.value.companyName || '',

    profileSummary:
      this.profileForm.value.bio || '',

    serviceAreaFocus:
      this.profileForm.value.serviceAreaFocus || '',

    yearsInBusiness:
      this.getYearsValue(
        this.profileForm.value.yearsInBusiness
      ),

    availabilityWorkingHours:
      this.profileForm.value.workingHours || '',

    displayBrandName:
      this.profileForm.value.displayName || '',

    tagline:
      this.profileForm.value.headline || '',

    websiteUrl:
      this.profileForm.value.website || '',

    instagramUrl:
      this.profileForm.value.instagram || '',

    facebookUrl:
      this.profileForm.value.facebook || '',

    linkedInUrl:
      this.profileForm.value.linkedin || '',

    twitterUrl:
      this.profileForm.value.twitter || '',

    tikTokUrl:
      this.profileForm.value.tiktok || '',

    youTubeUrl:
      this.profileForm.value.youtube || '',

    additionalLinkUrl:
      this.profileForm.value.additionalLink || '',

    coverageAreas:
      this.selectedAreas,

    logoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    bannerImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    galleryUrls: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    ],

    catalogBrochureUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    allowVendorInquiries:
      this.profileForm.value.allowVendorInquiries,

    showPublicProfile:
      this.profileForm.value.showProfilePublicly,

    receivePlatformUpdates:
      this.profileForm.value.receivePlatformUpdates,

    showSocialLinks:
      this.profileForm.value.showSocialLinks,

    preferredContactMethod:
      this.profileForm.value.preferredContactMethod || '',

    publicContactEmail:
      this.profileForm.value.publicContactEmail || '',

    serviceTags:
      this.selectedSkills,

    suggestedTags:
      this.selectedSkills

  };

  console.log('PAYLOAD');
  console.log(payload);

  this.profileService
    .completeVendorProfile(payload)
    .subscribe({

      next: (res) => {

        this.isLoading = false;

        this.successMessage =
          'Profile completed successfully.';

        if (isDraft) {

          this.router.navigate([
            '/business-vendor-step-2'
          ]);

        } else {

          this.router.navigate([
            '/business-vendor-step-2'
          ]);

        }

      },

      error: (err) => {

        this.isLoading = false;

        console.error(err);

        alert(
          'Failed to complete profile'
        );

      }

    });

}
getYearsValue(years: string): number {

  switch (years) {

    case '0-1 Years':
      return 1;

    case '1-3 Years':
      return 3;

    case '3-5 Years':
      return 5;

    case '6+ Years':
      return 6;

    case '10+ Years':
      return 10;

    default:
      return 0;

  }

}
}
