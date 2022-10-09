import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatPasswordComponent } from './popup-chat-password.component';

describe('PopupChatPasswordComponent', () => {
  let component: PopupChatPasswordComponent;
  let fixture: ComponentFixture<PopupChatPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChatPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChatPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
