import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-logged',
  templateUrl: './nav-bar-logged.component.html',
  styleUrls: ['./nav-bar-logged.component.css']
})
export class NavBarLoggedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    try {
      window.localStorage.removeItem('token_key');
      location.reload();
    } catch (e) {}
  }
}
