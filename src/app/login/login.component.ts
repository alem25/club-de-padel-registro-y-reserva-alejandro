import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  peticion = new XMLHttpRequest();

  Login(user, password) {
    const url = 'http://fenw.etsisi.upm.es:10000/users/login?username=' + user + '&password=' + password;
    this.peticion.open('GET', url, true);
    this.peticion.onload = this.TrataRespuesta;
    this.peticion.send(null);
  }

  TrataRespuesta() {
    let response;
    if (this.peticion !== null && this.peticion !== undefined && this.peticion.status && this.peticion.status === 200) {
      response = this.peticion.getResponseHeader('authorization');
      window.localStorage.setItem('token_key', response.replace('Bearer ', ''));
      document.getElementById('startlink').click();
    } else {
      alert('Usuario o contraseña incorrecta');
      location.reload();
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
