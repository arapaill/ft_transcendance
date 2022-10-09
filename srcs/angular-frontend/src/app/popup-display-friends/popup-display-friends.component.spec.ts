import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDisplayFriendsComponent } from './popup-display-friends.component';

describe('PopupDisplayFriendsComponent', () => {
  let component: PopupDisplayFriendsComponent;
  let fixture: ComponentFixture<PopupDisplayFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDisplayFriendsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDisplayFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
