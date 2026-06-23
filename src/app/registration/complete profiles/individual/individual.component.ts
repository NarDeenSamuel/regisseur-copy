import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../../navbar/navbar.component';
import { countries } from '../../../shared/countries';
import { SideBarComponent } from '../../../side-bar/side-bar.component';

@Component({
  selector: 'app-individual',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    SideBarComponent
  ],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.css'
})
export class IndividualComponent implements OnInit{
isLoading = false;
ngOnInit(): void {

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
validationMessage = '';
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
],  phone: ['', Validators.required],
  displayName: [''],
  headline: [''],

  // Step 2

bio: ['', Validators.required],
  languages: [[]],
  occupation: [''],
discoveryGoal: ['', Validators.required],
availability: ['', Validators.required],

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
city: ['', Validators.required],
  region: [''],
address: ['', Validators.required],
  postalCode: [''],
  preferredAreas: [[]],

  // Step 5

  avatar: [null],
  banner: [null],
  gallery: [[]],
  aboutFile: [null],

  // Step 6

  allowDirectMessages: [true],
  showProfilePublicly: [true],
  receiveUpdates: [true],
  showSocialLinks: [true],
  preferredContactMethod: ['Email'],
  publicContactEmail: [''],

  // Step 7

budgetRange: ['', Validators.required],
favoriteAtmosphere: ['', Validators.required],
travelRadius: ['', Validators.required],
preferredEventSize: ['', Validators.required],
  accessibilityNeeds: ['']

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
getBudgetMin(range: string): number {

  if (range?.includes('$0 - $25')) return 0;
  if (range?.includes('$25 - $75')) return 25;
  if (range?.includes('$75 - $150')) return 75;
  if (range?.includes('$150 - $300')) return 150;
  if (range?.includes('$300+')) return 300;

  return 0;

}

getBudgetMax(range: string): number {

  if (range?.includes('$0 - $25')) return 25;
  if (range?.includes('$25 - $75')) return 75;
  if (range?.includes('$75 - $150')) return 150;
  if (range?.includes('$150 - $300')) return 300;
  if (range?.includes('$300+')) return 999999;

  return 0;

}

getTravelRadius(value: string): number {

  if (value === 'Up to 5 miles') return 5;
  if (value === 'Up to 15 miles') return 15;
  if (value === 'Up to 30 miles') return 30;
  if (value === 'Up to 50 miles') return 50;
  if (value === 'No Limit') return 999999;

  return 0;

}
// submitForm(isDraft: boolean = false): void {

//   if (!isDraft && this.profileForm.invalid) {

//     this.profileForm.markAllAsTouched();

//     return;

//   }

//   const form = this.profileForm.getRawValue();

//   const user = JSON.parse(
//     localStorage.getItem('user') || '{}'
//   );

//   const payload = {

//     userId: user.id,

//     isDraft: isDraft,

//     firstName: form.firstName || '',

//     lastName: form.lastName || '',

//     phone: `${this.selectedCountry.code}${form.phone}`,

//     displayName: form.displayName || '',

//     country: form.country || '',

//     city: form.city || '',

//     state: form.region || '',

//     address: form.address || '',

//     postalCode: form.postalCode || '',

//     shortBio: form.bio || '',

//     languages: this.selectedLanguages.join(','),

//     occupation: form.occupation || '',

//     discoveryGoal: form.discoveryGoal || '',

//     availability: form.availability || '',

//     websiteUrl: form.website || '',

//     instagramUrl: form.instagram || '',

//     facebookUrl: form.facebook || '',

//     linkedInUrl: form.linkedin || '',

//     tikTokUrl: form.tiktok || '',

//     youtubeUrl: form.youtube || '',

//     additionalLinkUrl: form.additionalLink || '',

//     preferredCities: this.selectedAreas.join(','),

//     allowDirectMessages:
//       form.allowDirectMessages ?? true,

//     showProfilePublicly:
//       form.showProfilePublicly ?? true,

//     showSocialLinksPublicly:
//       form.showSocialLinks ?? true,

//     preferredContactMethod:
//       form.preferredContactMethod || '',

//     publicContactEmail:
//       form.publicContactEmail || '',

//     budgetMin:
//       this.getBudgetMin(form.budgetRange),

//     budgetMax:
//       this.getBudgetMax(form.budgetRange),

//     favoriteAtmosphere:
//       form.favoriteAtmosphere || '',

//     travelRadiusMiles:
//       this.getTravelRadius(form.travelRadius),

//     preferredEventSize:
//       form.preferredEventSize || '',

//     accessibilityNeeds:
//       form.accessibilityNeeds || '',

//     avatarUrl:
//       this.profilePhotoPreview || '',

//     bannerUrl:
//       this.bannerPreview || '',

//     galleryUrls:
//       this.galleryPreviews.join(','),

//     introFileUrl:
//       this.aboutFileName || ''

//   };

//   console.log(payload);

//   this.profileService
//     .completeExplorerProfile(payload)
//     .subscribe({

//       next: (res) => {

//         console.log(res);

//         if (isDraft) {

//           this.router.navigate([
//             '/Individual'
//           ]);

//         } else {

//           this.router.navigate([
//             '/Individual-interests'
//           ]);

//         }

//       },

//       error: (err) => {

//         console.log(err);

//       }

//     });

// }

submitForm(isDraft: boolean = false): void {
this.isLoading = true;

  this.validationMessage = '';

  // Required Languages

  if (
    !isDraft &&
    this.selectedLanguages.length === 0
  ) {

    this.validationMessage =
      'Please select at least one language';

    return;

  }

  // Required Images

  if (
    !isDraft &&
    (
      !this.profilePhoto ||
      !this.bannerImage ||
      !this.aboutFile
    )
  ) {

    this.validationMessage =
      'Please upload all required files';

    return;

  }

  // Required Form Controls

  if (
    !isDraft &&
    this.profileForm.invalid
  ) {

    this.profileForm.markAllAsTouched();

    this.validationMessage =
      'Please complete all required fields';

    return;

  }
this.isLoading = true;

  const form =
    this.profileForm.getRawValue();

  const user =
    JSON.parse(
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
      `${this.selectedCountry.code}${form.phone}`,

    displayName:
      form.displayName || '',

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

    shortBio:
      form.bio || '',

    languages:
      this.selectedLanguages.join(','),

    occupation:
      form.occupation || '',

    discoveryGoal:
      form.discoveryGoal || '',

    availability:
      form.availability || '',

    websiteUrl:
      form.website || '',

    instagramUrl:
      form.instagram || '',

    facebookUrl:
      form.facebook || '',

    linkedInUrl:
      form.linkedin || '',

    tikTokUrl:
      form.tiktok || '',

    youtubeUrl:
      form.youtube || '',

    additionalLinkUrl:
      form.additionalLink || '',

    preferredCities:
      this.selectedAreas.join(','),

    allowDirectMessages:
      form.allowDirectMessages,

    showProfilePublicly:
      form.showProfilePublicly,

    showSocialLinksPublicly:
      form.showSocialLinks,

    preferredContactMethod:
      form.preferredContactMethod || '',

    publicContactEmail:
      form.publicContactEmail || '',

    budgetMin:
      this.getBudgetMin(
        form.budgetRange
      ),

    budgetMax:
      this.getBudgetMax(
        form.budgetRange
      ),

    favoriteAtmosphere:
      form.favoriteAtmosphere || '',

    travelRadiusMiles:
      this.getTravelRadius(
        form.travelRadius
      ),

    preferredEventSize:
      form.preferredEventSize || '',

    accessibilityNeeds:
      form.accessibilityNeeds || '',

    avatarUrl:
     'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    bannerUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    galleryUrls:
     'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

    introFileUrl:
     'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

  };

  console.log('PAYLOAD');
  console.log(payload);

  this.profileService
    .completeExplorerProfile(payload)
    .subscribe({

     next: (res: any) => {
      this.isLoading = false;

  const currentUser = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const updatedUser = {

    ...currentUser, // القديم كله

    ...payload      // الجديد يكتب فوق القديم

  };

  localStorage.setItem(
    'user',
    JSON.stringify(updatedUser)
  );

  if (isDraft) {

    this.router.navigate([
      '/Individual-interests'
    ]);

  } else {

    this.router.navigate([
      '/Individual-interests'
    ]);

  }

},

      error: (err) => {
      this.isLoading = false;

        console.log(
          'ERROR',
          err
        );

        this.validationMessage =
          'Something went wrong. Please try again.';

      }

    });

}







}
