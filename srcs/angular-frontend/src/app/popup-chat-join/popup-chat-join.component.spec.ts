import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatJoinComponent } from './popup-chat-join.component';

describe('PopupChatJoinComponent', () => {
  let component: PopupChatJoinComponent;
  let fixture: ComponentFixture<PopupChatJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChatJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChatJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
