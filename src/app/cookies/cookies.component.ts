import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.CookieDelete();
  }

  CookieDelete() {
      const cookieTok = window.localStorage.getItem('cookie_accepted');
      if (cookieTok !== null) {
        this.setCookie();
      }
  }

  setCookie() {
    window.localStorage.setItem('cookie_accepted', Date.now().toString());
    document.getElementById('cookie').innerHTML = null;
  }
}
