import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationRulesComponent } from './location-rules.component';

describe('LocationRulesComponent', () => {
  let component: LocationRulesComponent;
  let fixture: ComponentFixture<LocationRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
