import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateLocationComponent } from "./location/pages/create-location/create-location.component";

@Component({
  selector: 'app-space',
  imports: [SideBarComponent, NavbarComponent, CommonModule, FormsModule, CreateLocationComponent],
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent {
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
  'Active',
  'Draft',
  'Archived'
];

locations = [
  'Cairo',
  'Alexandria',
  'Giza'
];
}
