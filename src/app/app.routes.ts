import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardOverviewComponent } from './admin-dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardEventsComponent } from './admin-dashboard/dashboard-events/dashboard-events.component';
import { DashboardTicketingComponent } from './admin-dashboard/dashboard-ticketing/dashboard-ticketing.component';
import { DashboardProjectsComponent } from './admin-dashboard/dashboard-projects/dashboard-projects.component';
import { DashboardVendorsComponent } from './admin-dashboard/dashboard-vendors/dashboard-vendors.component';
import { DashboardSpaceComponent } from './admin-dashboard/dashboard-space/dashboard-space.component';
import { DashboardArtistsComponent } from './admin-dashboard/dashboard-artists/dashboard-artists.component';
import { DashboardProducersComponent } from './admin-dashboard/dashboard-producers/dashboard-producers.component';
import { DashboardAgreementsComponent } from './admin-dashboard/dashboard-agreements/dashboard-agreements.component';
import { DashboardVerificationComponent } from './admin-dashboard/dashboard-verification/dashboard-verification.component';
import { DashboardDisputesComponent } from './admin-dashboard/dashboard-disputes/dashboard-disputes.component';
import { DashboardPaymentsComponent } from './admin-dashboard/dashboard-payments/dashboard-payments.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './registration/signin/signin.component';
import { SignupComponent } from './registration/signup/signup.component';
import { IndividualComponent } from './registration/complete profiles/individual/individual.component';
import { IndividualArtistComponent } from './registration/complete profiles/individual-artist/individual-artist.component';
import { IndividualProducerComponent } from './registration/complete profiles/individual-producer/individual-producer.component';
import { BusinessVendorComponent } from './registration/complete profiles/business-vendor/business-vendor.component';
import { BusinessSpaceComponent } from './registration/complete profiles/business-space/business-space.component';
import { BusinessServiceProviderComponent } from './registration/complete profiles/business-service-provider/business-service-provider.component';
import { OrganizationSpaceComponent } from './registration/complete profiles/organization-space/organization-space.component';
import { BusinessServiceProviderStep2Component } from './registration/complete profiles/business-service-provider-step-2/business-service-provider-step-2.component';
import { BusinessSpaceStep2Component } from './registration/complete profiles/business-space-step-2/business-space-step-2.component';
import { BusinessVendorStep2Component } from './registration/complete profiles/business-vendor-step-2/business-vendor-step-2.component';
import { OrganizationSpaceStep2Component } from './registration/complete profiles/organization-space-step-2/organization-space-step-2.component';
import { IndividualInterestsComponent } from './registration/complete profiles/individual-step-2/individual-interests/individual-interests.component';
import { IndividualServicesComponent } from './registration/complete profiles/individual-step-2/individual-services/individual-services.component';
import { IndividualSpaceComponent } from './registration/complete profiles/individual-step-2/individual-space/individual-space.component';
import { IndividualArtestInterestsComponent } from './registration/complete profiles/individual-artist-step-2/individual-artest-interests/individual-artest-interests.component';
import { IndividualArtestServicesComponent } from './registration/complete profiles/individual-artist-step-2/individual-artest-services/individual-artest-services.component';
import { IndividualArtestSpacesComponent } from './registration/complete profiles/individual-artist-step-2/individual-artest-spaces/individual-artest-spaces.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { SpaceComponent } from './space/space.component';
import { IndividualProducerInterestsComponent } from './registration/complete profiles/individual-producer-step-2/individual-producer-interests/individual-producer-interests.component';
import { IndividualProducerServicesComponent } from './registration/complete profiles/individual-producer-step-2/individual-producer-services/individual-producer-services.component';
import { IndividualProducerSpacesComponent } from './registration/complete profiles/individual-producer-step-2/individual-producer-spaces/individual-producer-spaces.component';
import { SingleEventComponent } from './events/single-event/single-event.component';
import { EventOverviewComponent } from './events/single-event/event-overview/event-overview.component';
import { TicketOrdersComponent } from './events/single-event/ticket-orders/ticket-orders.component';
import { EventGuestsComponent } from './events/single-event/event-guests/event-guests.component';
import { EventCrewComponent } from './events/single-event/event-crew/event-crew.component';
import { ProgramPerformanceComponent } from './events/single-event/program-performance/program-performance.component';
import { RSVPInvitationsComponent } from './events/single-event/rsvp-invitations/rsvp-invitations.component';
import { CheckInComponent } from './events/single-event/check-in/check-in.component';
import { SeatingComponent } from './events/single-event/seating/seating.component';
import { RefundsComponent } from './events/single-event/refunds/refunds.component';
import { ReportsComponent } from './events/single-event/reports/reports.component';
import { SettingsComponent } from './events/single-event/settings/settings.component';
import { AllEventsComponent } from './events/all-events/all-events.component';
import { AllSpacesComponent } from './space/all-spaces/all-spaces.component';
import { LocationVerifyComponent } from './space/location/components/location-verify/location-verify.component';

export const routes: Routes = [
{path:'',redirectTo:'registration',pathMatch:'full'}
  ,
  {path:'registration',component:RegistrationComponent,
    children:[
      {path:'',redirectTo:'signin',pathMatch:'full'},
      {path:'signin' ,component:SigninComponent},
      {path:'signup',component:SignupComponent},
      {path:'signin/signup',redirectTo:'signup',pathMatch:'full'},
    ]
  }

,{path:'home',component:HomeComponent}
,{path:'events',component:EventsComponent}
,{path:'all-events',component:AllEventsComponent}
,{path:'event',component:SingleEventComponent,
   children:[
      {path:'',redirectTo:'overview',pathMatch:'full'},
      {path:'overview',component:EventOverviewComponent},
      {path:'ticket-orders',component:TicketOrdersComponent},
      {path:'guests',component:EventGuestsComponent},
      {path:'crew',component:EventCrewComponent},
      {path:'program',component:ProgramPerformanceComponent},
      {path:'rsvp',component:RSVPInvitationsComponent},
      {path:'check-in',component:CheckInComponent},
      {path:'seating',component:SeatingComponent},
      {path:'refunds',component:RefundsComponent},
      {path:'reports',component:ReportsComponent},
      {path:'settings',component:SettingsComponent}
    ]
}
,{path:'all-spaces',component:AllSpacesComponent}

,{path:'spaces',component:SpaceComponent}
,{
    path: 'location/verify/:id',
    component: LocationVerifyComponent
  }



,{path:'Individual',component:IndividualComponent}
,{path:'Individual-artist',component:IndividualArtistComponent}
,{path:'Individual-producer',component:IndividualProducerComponent}
,{path:'business-vendor',component:BusinessVendorComponent}
,{path:'business-space',component:BusinessSpaceComponent}
,{path:'business-service-provider',component:BusinessServiceProviderComponent}
,{path:'organization-space',component:OrganizationSpaceComponent}

,{path:'Individual-interests',component:IndividualInterestsComponent}
,{path:'Individual-services',component:IndividualServicesComponent}
,{path:'Individual-spaces',component:IndividualSpaceComponent}


,{path:'Individual-artist-interests',component:IndividualArtestInterestsComponent}
,{path:'Individual-artist-services',component:IndividualArtestServicesComponent}
,{path:'Individual-artist-spaces',component:IndividualArtestSpacesComponent}

,{path:'Individual-producer-interests',component:IndividualProducerInterestsComponent}
,{path:'Individual-producer-services',component:IndividualProducerServicesComponent}
,{path:'Individual-producer-spaces',component:IndividualProducerSpacesComponent}


,{path:'business-vendor-step-2',component:BusinessVendorStep2Component}
,{path:'business-space-step-2',component:BusinessSpaceStep2Component}
,{path:'business-service-provider-step-2',component:BusinessServiceProviderStep2Component}
,{path:'organization-space-step-2',component:OrganizationSpaceStep2Component}




,

{ path:"mainDashboard",component:AdminDashboardComponent,
    children:[
      {path: '',redirectTo: 'Overview',pathMatch: 'full'},
      {path:'Overview' ,component:DashboardOverviewComponent},
      {path:'Events',component:DashboardEventsComponent},
      {path:'Ticketing',component:DashboardTicketingComponent},
      {path:'Projects',component:DashboardProjectsComponent},
      {path:'Vendors',component:DashboardVendorsComponent},
      {path:'Space',component:DashboardSpaceComponent},
      {path:'Artists',component:DashboardArtistsComponent},
      {path:'Producers',component:DashboardProducersComponent},
      {path:'Agreements',component:DashboardAgreementsComponent},
      {path:'Payments',component:DashboardPaymentsComponent},
      {path:'Verification',component:DashboardVerificationComponent},
      {path:'Disputes',component:DashboardDisputesComponent},



      // {path:"logOut",redirectTo:"/home" , pathMatch:'full'}
    ]
  }




];
