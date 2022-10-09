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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoProfilComponent } from './info-profil/info-profil.component';
import { PopupModifierProfilComponent } from './popup-modifier-profil/popup-modifier-profil.component';
import { PopupAddFriendComponent } from './popup-add-friend/popup-add-friend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupChatAddComponent } from './popup-chat-add/popup-chat-add.component';
import { PopupChatSettingsComponent } from './popup-chat-settings/popup-chat-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupChatUserComponent } from './popup-chat-user/popup-chat-user.component';
import { PopupClickHereComponent } from './popup-click-here/popup-click-here.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PopupChatPasswordComponent } from './popup-chat-password/popup-chat-password.component';
import { PopupDisplayFriendsComponent } from './popup-display-friends/popup-display-friends.component';
import { LoginComponent } from './login/login.component';
import { PopupPongInvitationComponent } from './popup-pong-invitation/popup-pong-invitation.component';
import { myUser } from './models/user.model';
import { PopupChatJoinComponent } from './popup-chat-join/popup-chat-join.component';
import { PopupQrcodeComponent } from './popup-qrcode/popup-qrcode.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ChatComponent,
    PongComponent,
    ProfileComponent,
    ClassementComponent,
    AcceuilComponent,
    InfoProfilComponent,
    PopupModifierProfilComponent,
    PopupAddFriendComponent,
    PopupChatAddComponent,
    PopupChatSettingsComponent,
    PopupChatUserComponent,
    PopupClickHereComponent,
    PopupChatPasswordComponent,
    PopupDisplayFriendsComponent,
    LoginComponent,
    PopupPongInvitationComponent,
    PopupChatJoinComponent,
    PopupQrcodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [
    myUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
