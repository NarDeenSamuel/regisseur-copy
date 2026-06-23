import { Component } from '@angular/core';
import { ProjectsHeaderComponent } from "./projects-header/projects-header.component";
import { ProjectsCardsComponent } from './projects-cards/projects-cards.component';
import { ProjectsTableComponent } from "./projects-table/projects-table.component";

@Component({
  selector: 'app-dashboard-projects',
  imports: [ProjectsHeaderComponent, ProjectsCardsComponent, ProjectsTableComponent],
  templateUrl: './dashboard-projects.component.html',
  styleUrl: './dashboard-projects.component.css'
})
export class DashboardProjectsComponent {

}
