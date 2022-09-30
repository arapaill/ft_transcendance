import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-popup-modifier-profil',
  templateUrl: './popup-modifier-profil.component.html',
  styleUrls: ['./popup-modifier-profil.component.scss']
})
export class PopupModifierProfilComponent implements OnInit {

  constructor(private http: HttpClient) { }

  selectedFile!: File;

  ngOnInit(): void {
  }
  processFile(event : any){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload(){

  }

}
