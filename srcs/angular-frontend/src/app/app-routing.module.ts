import {BrowserModule} from'@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassementComponent } from './classement/classement.component';
import { ProfileComponent } from './profile/profile.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

const routes: Routes = [
  {path:'', redirectTo: '/acceuil', pathMatch: 'full'},
  {path:'acceuil', component : AcceuilComponent},
  {path:'profile', component: ProfileComponent},
  {path:'classement', component:ClassementComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
