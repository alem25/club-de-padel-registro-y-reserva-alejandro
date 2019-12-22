import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public jwt;

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar,
              private token: TokenService) { }

  Login(user, password) {
    const url = 'http://fenw.etsisi.upm.es:10000/users/login?username=' + user + '&password=' + password;
    return this.http.get( url, {observe: 'response'}).subscribe(
      response => {
        this.jwt = response.headers.get('Authorization');
        this.token.storeToken(this.jwt);
        this.router.navigate(['/start']);
      }, () => {
            this.snackbar.open('Usuario o contraseña incorrecta', 'Aceptar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            this.router.navigate(['/login']);
      }, () => {
      }
    );
  }

  ngOnInit() {
  }
}
