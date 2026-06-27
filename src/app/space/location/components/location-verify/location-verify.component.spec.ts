import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationVerifyComponent } from './location-verify.component';

describe('LocationVerifyComponent', () => {
  let component: LocationVerifyComponent;
  let fixture: ComponentFixture<LocationVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
