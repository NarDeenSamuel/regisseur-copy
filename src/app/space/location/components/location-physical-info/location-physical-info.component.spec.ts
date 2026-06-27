import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPhysicalInfoComponent } from './location-physical-info.component';

describe('LocationPhysicalInfoComponent', () => {
  let component: LocationPhysicalInfoComponent;
  let fixture: ComponentFixture<LocationPhysicalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationPhysicalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPhysicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
