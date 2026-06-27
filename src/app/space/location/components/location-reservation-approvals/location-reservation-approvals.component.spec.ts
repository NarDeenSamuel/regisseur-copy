import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReservationApprovalsComponent } from './location-reservation-approvals.component';

describe('LocationReservationApprovalsComponent', () => {
  let component: LocationReservationApprovalsComponent;
  let fixture: ComponentFixture<LocationReservationApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationReservationApprovalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationReservationApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
