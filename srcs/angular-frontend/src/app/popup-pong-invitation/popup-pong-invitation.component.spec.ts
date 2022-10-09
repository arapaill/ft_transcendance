import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPongInvitationComponent } from './popup-pong-invitation.component';

describe('PopupPongInvitationComponent', () => {
  let component: PopupPongInvitationComponent;
  let fixture: ComponentFixture<PopupPongInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPongInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPongInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
