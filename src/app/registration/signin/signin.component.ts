import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
otpMessage = '';
  showPassword = false;

  loginErrorMessage = '';

  signInForm: FormGroup;
isOtpModalOpen = false;

otp = '';

otpErrorMessage = '';
otpSuccessMessage = '';

isVerifyingOtp = false;
isResendingOtp = false;
remainingSeconds = 900;

canResendOtp = false;

timer: any;
loginEmail = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.signInForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        Validators.required
      ],

      rememberMe: [false]

    });

  }

  togglePassword() {

    this.showPassword =
      !this.showPassword;

  }
get formattedTime(): string {

  const minutes =
    Math.floor(this.remainingSeconds / 60);

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
verifyOtp() {

  this.isVerifyingOtp = true;

  this.otpMessage = '';
  this.otpSuccessMessage = '';

  const payload = {

    email: this.loginEmail,
    otp: this.otp

  };

  this.authService
    .verifyOtp(payload)
    .subscribe({

      next: () => {

        this.isVerifyingOtp = false;

        this.otpSuccessMessage =
          'Email verified successfully';

        setTimeout(() => {

          this.isOtpModalOpen = false;

          this.loginErrorMessage = '';

        }, 1500);

      },

      error: (error) => {

        this.isVerifyingOtp = false;

        const errorText =
          error?.error?.toString?.() ||
          JSON.stringify(error);

        if (
          errorText.includes(
            'Invalid OTP'
          )
        ) {

          this.otpMessage =
            'Wrong OTP code';

          return;

        }

        if (
          errorText.includes(
            'expired'
          )
        ) {

          this.otpMessage =
            'OTP has expired. Please request a new one.';

          return;

        }

        this.otpMessage =
          'Verification failed';

      }

    });

}


resendOtp() {

  this.isResendingOtp = true;

  this.otpMessage = '';
  this.otpSuccessMessage = '';

  this.authService
    .resendOtp(this.loginEmail)
    .subscribe({

      next: () => {

        this.isResendingOtp = false;

        this.otpSuccessMessage =
          'A new OTP has been sent successfully.';

        this.startOtpTimer();

      },

      error: (error) => {

        this.isResendingOtp = false;

        const errorText =
          error?.error?.toString?.() ||
          JSON.stringify(error);

        if (
          errorText.includes(
            'Current OTP is still valid'
          )
        ) {

          this.otpMessage =
            'Your current OTP is still valid. Please use it before requesting a new one.';

          return;

        }

        this.otpMessage =
          'Failed to resend OTP';

      }

    });

}
  submitForm() {

    this.loginErrorMessage = '';

    if (!this.signInForm.valid) {

      this.signInForm.markAllAsTouched();

      return;

    }

    const payload = {

      email:
        this.signInForm.value.email,

      password:
        this.signInForm.value.password

    };

    this.authService
      .login(payload)
      .subscribe({

        next: (response: any) => {

  console.log(response);

  localStorage.setItem(
    'user',
    JSON.stringify(response)
  );

  if (!response.isFirstLogin) {

    this.router.navigate(['/home']);

    return;

  }

  const userType = response.userType;
  const role = response.primaryRole;

  // Individual + Explorer
  if (
    userType === 1 &&
    (role === null || role === undefined)
  ) {

    this.router.navigate(['/Individual']);

  }

  // Individual + ArtistTalent
  else if (
    userType === 1 &&
    role === 1
  ) {

    this.router.navigate(['/Individual-artist']);

  }

  // Individual + Producer
  else if (
    userType === 1 &&
    role === 2
  ) {

    this.router.navigate(['/Individual-producer']);

  }

  // Individual + Organizer
  else if (
    userType === 1 &&
    role === 3
  ) {

    this.router.navigate(['/Individual-producer']);

  }

  // Business + Vendor
  else if (
    userType === 2 &&
    role === 4
  ) {

    this.router.navigate(['/business-vendor']);

  }

  // Business + Service Provider
  else if (
    userType === 2 &&
    role === 5
  ) {

    this.router.navigate(['/business-service-provider']);

  }

  // Business + Venue
  else if (
    userType === 2 &&
    role === 6
  ) {

    this.router.navigate(['/business-space']);

  }

  // Organization + Venue
  else if (
    userType === 3 &&
    role === 6
  ) {

    this.router.navigate(['/organization-space']);

  }

},

   error: (error) => {

  console.log('FULL ERROR =>', error);

  console.log('ERROR BODY =>', error.error);

  console.log(
    'CHECK =>',
    error?.error?.includes(
      'Please verify your email first'
    )
  );

  if (
    error?.error &&
    error.error.includes(
      'Please verify your email first'
    )
  ) {

    console.log('OPENING OTP MODAL');

    this.loginEmail =
      this.signInForm.value.email;

    this.isOtpModalOpen = true;


    this.canResendOtp = false;

    this.otp = '';

    this.otpErrorMessage = '';

    clearInterval(this.timer);

    return;

  }

  console.log('WRONG EMAIL OR PASSWORD');

  this.loginErrorMessage =
    'Wrong email or password';

}
      });

  }

}
