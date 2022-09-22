import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-chat-add',
  templateUrl: './popup-chat-add.component.html',
  styleUrls: ['./popup-chat-add.component.scss']
})
export class PopupChatAddComponent implements OnInit {
  isPasswordChecked = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(event: any) {
    if (event.checked == true)
      this.isPasswordChecked = true;
    else
      this.isPasswordChecked = false;
  }

}
