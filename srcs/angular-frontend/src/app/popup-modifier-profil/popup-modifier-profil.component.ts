import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service'
import { HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-popup-modifier-profil',
  templateUrl: './popup-modifier-profil.component.html',
  styleUrls: ['./popup-modifier-profil.component.scss']
})
export class PopupModifierProfilComponent implements OnInit {

  
  constructor(private webSocketService: WebSocketService, private http: HttpClient, private dialogRef: MatDialogRef<PopupModifierProfilComponent>) { }

  selectedFile!: File;

  ngOnInit(): void {
  }
  processFile(event : any){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.selectedFile = <File>event.target.files[0];
    this.webSocketService.emit("updateUserAvatar", fd);
  }

  save(value : any){
    this.dialogRef.close(value);
    
  }
  close(){
    this.dialogRef.close();
  }

}
