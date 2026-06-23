import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { countries } from '../../../shared/countries';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-individual-producer',
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule,SideBarComponent],
  templateUrl: './individual-producer.component.html',
  styleUrl: './individual-producer.component.css'
})
export class IndividualProducerComponent implements OnInit  {
isLoading = false;
validationMessage = '';
userRole = '';

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
  this.userRole = user.primaryRoleName || '';
  this.profileForm.patchValue({
    email: user.email || '',
    category: this.userRole
  });

  this.profileForm.get('category')
    ?.disable();
  this.profileForm.patchValue({
    email: user.email || ''
  });


}
  profileForm: FormGroup;

  selectedLanguages: string[] = [];
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

allSkills: string[] = [

  'Event Production',
  'Event Planning',
  'Festival Production',
  'Corporate Events',
  'Brand Activations',
  'Vendor Coordination',
  'Logistics',
  'Run of Show',
  'Hospitality',
  'Guest Experience',
  'Stage Management',
  'Scheduling',
  'Operations',
  'Sponsorships',
  'Team Leadership',
  'Production Management'

];

suggestedTags: string[] = [

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
  ) {

   this.profileForm = this.fb.group({

  // Step 1

  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
 email: [
  { value: '', disabled: true },
  [Validators.required, Validators.email]
],
  phone: ['', Validators.required],
  displayName: [''],
  headline: [''],

  // Step 2

  category: ['Producer / Organizer', Validators.required],
specialization: ['', Validators.required],
companyName: [''],
bio: ['', Validators.required],
languages: [[]],
experienceLevel: ['', Validators.required],
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

allowContactRequests: [true],
showProfilePublicly: [true],
receiveBookingRequests: [true],
showInListings: [true],
showSocialLinks: [true],
publicContactEmail: [''],
  // Step 7

  skills: [[]]

});

  }

  addLanguage(event: Event): void {

    const target =
      event.target as HTMLSelectElement;

    const language = target.value;

    if (
      language &&
      !this.selectedLanguages.includes(language)
    ) {

      this.selectedLanguages.push(language);

    }

    target.value = '';

  }

  removeLanguage(language: string): void {

    this.selectedLanguages =
      this.selectedLanguages.filter(
        item => item !== language
      );

  }
showLanguageDropdown = false;

selectLanguage(language: string): void {

  if (
    language &&
    !this.selectedLanguages.includes(language)
  ) {

    this.selectedLanguages.push(language);

  }

  this.showLanguageDropdown = false;

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


selectAtmosphere(value: string): void {

  this.profileForm.patchValue({
    favoriteAtmosphere: value
  });

}

selectEventSize(value: string): void {

  this.profileForm.patchValue({
    preferredEventSize: value
  });

}
convertExperience(): number {

  switch (
    this.profileForm.value
      .experienceLevel
  ) {

    case '0-1 Years':
      return 1;

    case '1-3 Years':
      return 3;

    case '3-5 Years':
      return 5;

    case '5-8 Years':
      return 8;

    case '8+ Years':
      return 10;

    default:
      return 0;

  }

}
getMissingFields(): string[] {

  const missingFields: string[] = [];

  const requiredControls = [

    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'category', label: 'Category' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'bio', label: 'Profile Bio' },
    { key: 'country', label: 'Country' },
    { key: 'city', label: 'City' },
    { key: 'experienceLevel', label: 'Experience Level' },
    { key: 'workingHours', label: 'Availability / Working Hours' }

  ];

  requiredControls.forEach(field => {

    const value =
      this.profileForm.get(field.key)?.value;

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {

      missingFields.push(field.label);

    }

  });

  if (!this.selectedLanguages.length) {

    missingFields.push('Languages');

  }

  if (!this.selectedSkills.length) {

    missingFields.push('Production Skills');

  }

  return missingFields;

}
submitForm(isDraft: boolean = false): void {

  this.validationMessage = '';

  if (!isDraft) {

    this.profileForm.markAllAsTouched();

    const missingFields =
      this.getMissingFields();

    if (missingFields.length > 0) {

      this.validationMessage =
        'Please complete the following fields: ' +
        missingFields.join(', ');

      return;

    }

  }

  this.isLoading = true;

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const payload = {

    userId: user.id,

    firstName:
      this.profileForm.value.firstName,

    lastName:
      this.profileForm.value.lastName,

    phone:
      this.selectedCountry.code +
      this.profileForm.value.phone,

    professionalName:
      this.profileForm.value.displayName,

    bio:
      this.profileForm.value.bio,

    country:
      this.profileForm.value.country,

    city:
      this.profileForm.value.city,

    state:
      this.profileForm.value.region,

    address:
      this.profileForm.value.address,

    postalCode:
      this.profileForm.value.postalCode,

    yearsOfExperience:
      this.convertExperience(),

    availabilityWorkingHours:
      this.profileForm.value.workingHours,

    displayProfessionalName:
      this.profileForm.value.displayName,

    tagline:
      this.profileForm.value.headline,

    languages:
      this.selectedLanguages,

    websiteUrl:
      this.profileForm.value.website,

    instagramUrl:
      this.profileForm.value.instagram,

    facebookUrl:
      this.profileForm.value.facebook,

    linkedInUrl:
      this.profileForm.value.linkedin,

    twitterUrl:
      this.profileForm.value.twitter,

    tikTokUrl:
      this.profileForm.value.tiktok,

    youTubeUrl:
      this.profileForm.value.youtube,

    additionalLinkUrl:
      this.profileForm.value.additionalLink,

    coverageAreas:
      this.selectedAreas,

    profilePhotoUrl:
     'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

    bannerImageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

    galleryUrls:
    ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'],

    pressKitUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

    allowBookingRequests:
      this.profileForm.value.allowContactRequests,

    showPublicProfile:
      this.profileForm.value.showProfilePublicly,

    allowCollaborationRequests:
      this.profileForm.value.receiveBookingRequests,

    showEventListings:
      this.profileForm.value.showInListings,

    showSocialLinks:
      this.profileForm.value.showSocialLinks,

    publicContactEmail:
      this.profileForm.value.publicContactEmail,

    isDraft: isDraft

  };

  // Producer Fields
  if (user.primaryRoleName === 'Producer') {

    Object.assign(payload, {

      producerCategory:
        this.profileForm.value.category,

      producerSpecialization:
        this.profileForm.value.specialization,

      producerBio:
        this.profileForm.value.bio,

      productionSkills:
        this.selectedSkills,

      productionTags:
        this.selectedSkills

    });

  }

  // Organizer Fields
  else if (
    user.primaryRoleName === 'Organizer'
  ) {

    Object.assign(payload, {

      organizerCategory:
        this.profileForm.value.category,

      organizerSpecialization:
        this.profileForm.value.specialization,

      organizerBio:
        this.profileForm.value.bio,

      organizerSkills:
        this.selectedSkills,

      organizerTags:
        this.selectedSkills

    });

  }

  this.profileService
    .completeProfile(
      user.primaryRoleName,
      payload
    )
    .subscribe({

      next: (res: any) => {

        this.isLoading = false;

        console.log(
          'SUCCESS',
          res
        );

        const currentUser =
          JSON.parse(
            localStorage.getItem('user') || '{}'
          );

        localStorage.setItem(
          'user',
          JSON.stringify({
            ...currentUser,
            ...payload
          })
        );

        this.router.navigate([
          '/Individual-producer-interests'
        ]);

      },

      error: (err: any) => {

        this.isLoading = false;

        console.log(err);

        if (err.error?.errors) {

          this.validationMessage =
            Object.values(
              err.error.errors
            )
              .flat()
              .join(' - ');

        } else {

          this.validationMessage =
            err.error?.message ||
            'Failed to save profile';

        }

      }

    });

}
}
