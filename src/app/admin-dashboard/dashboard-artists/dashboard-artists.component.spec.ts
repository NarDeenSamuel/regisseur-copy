import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArtistsComponent } from './dashboard-artists.component';

describe('DashboardArtistsComponent', () => {
  let component: DashboardArtistsComponent;
  let fixture: ComponentFixture<DashboardArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardArtistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
