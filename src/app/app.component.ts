import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'club-de-padel-registro-y-reserva-alejandro';

  ngOnInit() {
  }

  isAuthorized() {
    try {
      const token = window.localStorage.getItem('token_key');
      const base64Url = token.split('.')[1];
      const decodedValue = JSON.parse(window.atob(base64Url));
      const expDate = decodedValue.exp;
      const today = Date.now();
      return today < expDate * 1000;
    } catch (e) {
      return false;
    }
  }
}

