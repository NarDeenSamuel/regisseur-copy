import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateLocationComponent } from "./location/pages/create-location/create-location.component";
import { LocationsService } from '../core/services/location/locations.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-space',
  imports: [SideBarComponent, NavbarComponent, CommonModule, FormsModule, CreateLocationComponent],
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent {
  userRole = '';
private locationService =
  inject(LocationsService);
ngOnInit(): void {

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

this.userRole = user.primaryRoleName;
  this.loadSpaces(user.id);


}
loadSpaces(ownerId: number): void {

  this.locationService
    .getLocationsByOwner(ownerId)
    .subscribe({

      next: (res) => {

  this.spaces = res;

  this.filteredSpaces = [...res];

  // لو عايزة المدن تتجاب تلقائي
  this.locations = [
    ...new Set(
      res
        .map(x => x.city)
        .filter(Boolean)
    )
  ];

  this.applyFilters();

},

      error: err => {

        console.error(err);

      }

    });

}
getStatus(status: number): string {

  switch (status) {

    case 0:
      return 'Draft';

    case 1:
      return 'Pending';

    case 2:
      return 'Active';

    case 3:
      return 'Archived';

    default:
      return '-';

  }

}
getStatusClass(status: number): string {

  switch (status) {

    case 0:
      return 'bg-secondary';

    case 1:
      return 'bg-danger';

    case 2:
      return 'bg-success';

    default:
      return 'bg-dark';

  }

}
openSpaceModal() {

  const modalId =
    this.userRole === 'Venue'
      ? 'addSpaceModal'
      : 'notAllowedModal';

  const modal =
    bootstrap.Modal.getOrCreateInstance(
      document.getElementById(modalId)
    );

  modal.show();

}
spaces: any[] = [];
tabs = [
  'All',
  'Facility / Sites',
  'Parent Spaces',
  'Single Managed Spaces',
  'Units',
  'Sub-Units',
  'Sections',
  'Sets',
  'Drafts'
];

selectedTab = 'All';

searchTerm = '';

selectedType = '';
selectedStatus = '';
selectedLocation = '';

sortBy = 'newest';

types = [
  'Facility',
  'Parent Space',
  'Unit',
  'Section'
];

statuses = [
  'Draft',
  'Pending',
  'Active',
  'Archived'
];

locations: string[] = [];
closeModal() {

  const modalEl =
    document.getElementById('createLocationModal');

  if (!modalEl) return;

  const modal =
    bootstrap.Modal.getInstance(modalEl);

  modal?.hide();

}
filteredSpaces: any[] = [];

applyFilters(): void {

  let data = [...this.spaces];

  // Search

  if (this.searchTerm.trim()) {

    const search = this.searchTerm.toLowerCase();

    data = data.filter(space =>

      space.name?.toLowerCase().includes(search) ||

      space.city?.toLowerCase().includes(search) ||

      space.state?.toLowerCase().includes(search) ||

      space.email?.toLowerCase().includes(search)

    );

  }

  // Status

  if (this.selectedStatus) {

    data = data.filter(space => {

      switch (this.selectedStatus) {

        case 'Draft':
          return space.locationStatus === 0;

        case 'Pending':
          return space.locationStatus === 1;

        case 'Active':
          return space.locationStatus === 2;

        case 'Archived':
          return space.locationStatus === 3;

        default:
          return true;

      }

    });

  }

  // Location

  if (this.selectedLocation) {

    data = data.filter(space =>

      space.city === this.selectedLocation

    );

  }

  // Sort

  switch (this.sortBy) {

    case 'name':

      data.sort((a, b) =>
        a.name.localeCompare(b.name));

      break;

    case 'oldest':

      data.sort((a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime());

      break;

    default:

      data.sort((a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime());

  }

  this.filteredSpaces = data;

}

getApproval(status: number): string {

  switch (status) {

    case 0:
      return 'Pending';

    case 1:
      return 'Approved';

    case 2:
      return 'Rejected';

    default:
      return '-';

  }

}

getApprovalClass(status: number): string {

  switch (status) {

    case 0:
      return 'bg-warning text-dark';

    case 1:
      return 'bg-success';

    case 2:
      return 'bg-danger';

    default:
      return 'bg-secondary';

  }

}



private router = inject(Router);

activateSpace(id: number): void {

  this.router.navigate([
    '/location/verify',
    id
  ]);

}
publishSpace(space: any): void {

  // Pending

  if (space.approvalStatus === 0) {

    const modal =
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById('pendingApprovalModal')
      );

    modal.show();

    return;

  }

  // Approved

  if (space.approvalStatus === 1) {

    console.log('Publish API');

    // هنا هتنادي API الـ Publish

    return;

  }

  // Rejected

  if (space.approvalStatus === 2) {

    const modal =
      bootstrap.Modal.getOrCreateInstance(
        document.getElementById('rejectedModal')
      );

    modal.show();

  }

}




}
