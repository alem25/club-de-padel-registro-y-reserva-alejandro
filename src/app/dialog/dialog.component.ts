import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public action = '';

  constructor() { }

  ngOnInit() {
  }

  onNoClick() {
    return false;
  }

  onYesClick() {
    return true;
  }
}
