import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSectionsComponent } from './location-sections.component';

describe('LocationSectionsComponent', () => {
  let component: LocationSectionsComponent;
  let fixture: ComponentFixture<LocationSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
