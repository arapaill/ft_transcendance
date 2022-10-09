import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChatAddComponent } from './popup-chat-add.component';

describe('PopupChatAddComponent', () => {
  let component: PopupChatAddComponent;
  let fixture: ComponentFixture<PopupChatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupChatAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupChatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
