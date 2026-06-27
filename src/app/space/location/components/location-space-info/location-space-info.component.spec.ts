import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSpaceInfoComponent } from './location-space-info.component';

describe('LocationSpaceInfoComponent', () => {
  let component: LocationSpaceInfoComponent;
  let fixture: ComponentFixture<LocationSpaceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSpaceInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSpaceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
