import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { PongComponent } from './pong/pong.component';
import { ProfileComponent } from './profile/profile.component';
import { ClassementComponent } from './classement/classement.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileAvatareComponent } from './profile-avatare/profile-avatare.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    PongComponent,
    ProfileComponent,
    ClassementComponent,
    AcceuilComponent,
    ProfileAvatareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
