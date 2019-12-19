import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public jwt;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  Login(user, password) {
    const url = 'http://fenw.etsisi.upm.es:10000/users/login?username=' + user + '&password=' + password;
    return this.http.get( url, {observe: 'response'}).subscribe(
      response => {
        this.jwt = response.headers.get('Authorization');
        window.localStorage.setItem('token_key', this.jwt.replace('Bearer ', ''));
        this.router.navigate(['/']);
      }, () => {
            this.snackBar.open('Usuario o contraseña incorrecta', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/login']);
      }, () => {
      }
    );
  }

  ngOnInit() {
  }
}
