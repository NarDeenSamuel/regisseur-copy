import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { countries } from '../../../shared/countries';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-individual-artist',
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule,SideBarComponent],
  templateUrl: './individual-artist.component.html',
styleUrls: ['./individual-artist.component.css']})
export class IndividualArtistComponent implements OnInit  {
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
    email: user.email || ''
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
  'Live Events',
  'Hospitality',
  'Production',
  'Talent',
  'Marketing',
  'Venue Ops',
  'Event Planning',
  'Stage Management',
  'Audio Engineering',
  'Lighting Design',
  'Artist Management',
  'Branding'
];

suggestedTags: string[] = [
  'Event Planning',
  'Stage Management',
  'Audio Engineering',
  'Lighting Design',
  'Artist Management',
  'Branding'
];
validationMessage = '';
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

  category: ['', Validators.required],
  companyName: [''],
  bio: ['', Validators.required],
  languages: [[]],
  experienceLevel: [''],
  workingHours: [''],

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
  receivePlatformUpdates: [true],
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

submitForm(isDraft: boolean = false): void {

  this.validationMessage = '';

 if (!isDraft) {

  this.profileForm.markAllAsTouched();

  const missingFields: string[] = [];

  if (!this.profileForm.get('firstName')?.value) {
    missingFields.push('First Name');
  }

  if (!this.profileForm.get('lastName')?.value) {
    missingFields.push('Last Name');
  }

  if (!this.profileForm.get('email')?.value) {
    missingFields.push('Email');
  }

  if (!this.profileForm.get('phone')?.value) {
    missingFields.push('Phone Number');
  }

  if (!this.profileForm.get('category')?.value) {
    missingFields.push('Category');
  }

  if (!this.profileForm.get('bio')?.value) {
    missingFields.push('Profile Summary');
  }

  if (!this.selectedLanguages.length) {
    missingFields.push('Languages');
  }

  if (!this.profileForm.get('experienceLevel')?.value) {
    missingFields.push('Experience Level');
  }

  if (!this.profileForm.get('workingHours')?.value) {
    missingFields.push('Availability');
  }

  if (!this.profileForm.get('country')?.value) {
    missingFields.push('Country');
  }

  if (!this.profileForm.get('city')?.value) {
    missingFields.push('City');
  }

  if (!this.selectedSkills.length) {
    missingFields.push('Skills');
  }

  if (missingFields.length) {

    this.validationMessage =
      'Missing required fields: ' +
      missingFields.join(', ');

    return;
  }
this.isLoading = true;

}
  const form = this.profileForm.getRawValue();

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const payload = {

    userId: user.id,

    isDraft: isDraft,

    firstName:
      form.firstName || '',

    lastName:
      form.lastName || '',

    phone:
      `${this.selectedCountry.code}${form.phone || ''}`,

    displayName:
      form.displayName || '',

    bio:
      form.bio || '',

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

    categoriesSpecialties:
      form.category
        ? [form.category]
        : [],

    companyOrganizationName:
      form.companyName || '',

    profileSummary:
      form.bio || '',

    languages:
      this.selectedLanguages,

    experienceLevel:
      form.experienceLevel || '',

    workingHoursAvailability:
      form.workingHours || '',

    websiteUrl:
      form.website || '',

    instagramUrl:
      form.instagram || '',

    facebookUrl:
      form.facebook || '',

    linkedInUrl:
      form.linkedin || '',

    twitterUrl:
      form.twitter || '',

    tikTokUrl:
      form.tiktok || '',

    youTubeUrl:
      form.youtube || '',

    spotifyUrl:
      form.spotify || '',

    additionalLinkUrl:
      form.additionalLink || '',

    coverageAreas:
      this.selectedAreas,

   profilePhotoUrl:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

bannerImageUrl:
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',

galleryUrls: [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
],

pressKitUrl:
  'https://example.com/file.pdf',

    allowBookingRequests:
      form.allowContactRequests,

    showProfilePublicly:
      form.showProfilePublicly,

    receivePlatformUpdates:
      form.receivePlatformUpdates,

    showSocialLinksPublicly:
      form.showSocialLinks,

    publicContactEmail:
      form.publicContactEmail || '',

    skills:
      this.selectedSkills,

    suggestedTags:
      this.selectedSkills

  };

  console.log('PAYLOAD', payload);

  this.profileService
    .completeArtistProfile(
      form.category,
      payload
    )
    .subscribe({

      next: (res: any) => {
      this.isLoading = false;

        console.log(
          'SUCCESS',
          res
        );

        const currentUser = JSON.parse(
          localStorage.getItem('user') || '{}'
        );

        const updatedUser = {

          ...currentUser,

          ...payload

        };

        localStorage.setItem(
          'user',
          JSON.stringify(updatedUser)
        );

        if (isDraft) {

          this.router.navigate([
            '/Individual-artist-interests'
          ]);

        } else {

          this.router.navigate([
            '/Individual-artist-interests'
          ]);

        }

      },

      error: (err: any) => {
      this.isLoading = false;

        console.log(
          'ERROR',
          err
        );

        if (err.error?.errors) {

          const errors = Object.values(
            err.error.errors
          )
          .flat()
          .join(' - ');

          this.validationMessage =
            errors as string;

        } else {

          this.validationMessage =
            'Something went wrong. Please try again.';

        }

      }

    });

}
}
