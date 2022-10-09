import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service'
import { HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { myUser } from '../models/user.model';



@Component({
  selector: 'app-popup-modifier-profil',
  templateUrl: './popup-modifier-profil.component.html',
  styleUrls: ['./popup-modifier-profil.component.scss']
})
export class PopupModifierProfilComponent implements OnInit {

  
  constructor(public myUser : myUser, private webSocketService: WebSocketService, private http: HttpClient, private dialogRef: MatDialogRef<PopupModifierProfilComponent>,) { }

  url: any;
  msg = "";

  ngOnInit(): void {
    this.webSocketService.emit("requestUserInfosID", Number(localStorage.getItem('id')));
    this.webSocketService.listen("getUserInfosID").subscribe((data: any) => {
      this.myUser.avatar = data.avatar;
      this.myUser.pseudo = data.name;
      this.myUser.description = data.Description;
      this.myUser.id = data.id;
    });
  }
  processFile(event : any){ //Angular 8
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg = "";
        this.url = reader.result; 
      }
    }

  save(value : any){
    
    this.webSocketService.emit("requestCheckUserName", value.Nom);
    this.webSocketService.listen("getCheckUserName").subscribe((check : any) => {
      if(!check && value.Nom)
        this.myUser.pseudo = value.Nom;
        if(value.Description)
        this.myUser.description = value.Description;
      if(this.url)
        this.myUser.avatar = this.url;
    this.webSocketService.emit("updateUser", this.myUser);
    this.dialogRef.close(this.myUser);
    });
   
  }
  close(){
    this.dialogRef.close();
  }

}
