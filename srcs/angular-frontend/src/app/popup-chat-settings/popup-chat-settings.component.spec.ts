import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatSettingsComponent } from './popup-chat-settings.component';

describe('PopupChatSettingsComponent', () => {
  let component: PopupChatSettingsComponent;
  let fixture: ComponentFixture<PopupChatSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChatSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChatSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
