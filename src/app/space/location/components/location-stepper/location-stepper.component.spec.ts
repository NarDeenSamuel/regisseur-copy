import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStepperComponent } from './location-stepper.component';

describe('LocationStepperComponent', () => {
  let component: LocationStepperComponent;
  let fixture: ComponentFixture<LocationStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
