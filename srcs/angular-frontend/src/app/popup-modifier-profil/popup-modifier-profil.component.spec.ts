import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifierProfilComponent } from './popup-modifier-profil.component';

describe('PopupModifierProfilComponent', () => {
  let component: PopupModifierProfilComponent;
  let fixture: ComponentFixture<PopupModifierProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifierProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModifierProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
