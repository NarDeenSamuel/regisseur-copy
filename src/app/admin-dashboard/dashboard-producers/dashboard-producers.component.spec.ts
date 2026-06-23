import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProducersComponent } from './dashboard-producers.component';

describe('DashboardProducersComponent', () => {
  let component: DashboardProducersComponent;
  let fixture: ComponentFixture<DashboardProducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProducersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
