import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatUserComponent } from './popup-chat-user.component';

describe('PopupChatUserComponent', () => {
  let component: PopupChatUserComponent;
  let fixture: ComponentFixture<PopupChatUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChatUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
