import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddFriendComponent } from './popup-add-friend.component';

describe('PopupAddFriendComponent', () => {
  let component: PopupAddFriendComponent;
  let fixture: ComponentFixture<PopupAddFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddFriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
