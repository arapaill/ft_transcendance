import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupClickHereComponent } from './popup-click-here.component';

describe('PopupClickHereComponent', () => {
  let component: PopupClickHereComponent;
  let fixture: ComponentFixture<PopupClickHereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupClickHereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupClickHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
