import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public jwt;

  constructor(private http: HttpClient) { }

  Login(user, password) {
    const url = 'http://fenw.etsisi.upm.es:10000/users/login?username=' + user + '&password=' + password;
    return this.http.get( url, {observe: 'response'}).subscribe(
      response => {
        this.jwt = response.headers.get('Authorization');
        window.localStorage.setItem('token_key', this.jwt.replace('Bearer ', ''));
        document.getElementById('startlink').click();
      }, error => {
        alert('Usuario o contraseña incorrecta ' + error.toString());
        location.reload();
      }, () => {
      }
    );
  }

  ngOnInit() {
  }
}
