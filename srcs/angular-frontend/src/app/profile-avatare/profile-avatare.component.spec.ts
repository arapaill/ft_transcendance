import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAvatareComponent } from './profile-avatare.component';

describe('ProfileAvatareComponent', () => {
  let component: ProfileAvatareComponent;
  let fixture: ComponentFixture<ProfileAvatareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAvatareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAvatareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
