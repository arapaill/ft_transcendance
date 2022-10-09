import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupQrcodeComponent } from './popup-qrcode.component';

describe('PopupQrcodeComponent', () => {
  let component: PopupQrcodeComponent;
  let fixture: ComponentFixture<PopupQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
