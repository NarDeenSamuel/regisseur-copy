import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPricingComponent } from './location-pricing.component';

describe('LocationPricingComponent', () => {
  let component: LocationPricingComponent;
  let fixture: ComponentFixture<LocationPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
