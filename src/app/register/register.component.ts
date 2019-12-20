import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  public nombre;
  public email1;
  public clave1;
  public fecha;
  public phone;
  public alreadyExists = true;

  CheckIfExists() {
    if (this.nombre !== null && this.nombre.length > 2) {
      const urlCheck = 'http://fenw.etsisi.upm.es:10000/users/' + this.nombre;
      return this.http.get(urlCheck, { observe: 'response'}).toPromise().then(
        response => {
          switch (response.status) {
            case 200:
              this.alreadyExists = true;
              this.snackBar.open('Este nombre de usuario ya existe', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
              break;
            default:
              break;
          }
        }).catch( (error) => {
        switch (error.status) {
          case 404:
            this.alreadyExists = false;
            this.snackBar.open('Usuario válido', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          case 500:
            this.snackBar.open('Error interno', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          default:
            break;
        }
      });
    }
  }

  Register() {
    const url = 'http://fenw.etsisi.upm.es:10000/users';
    const date = this.fecha !== undefined ? new Date(this.fecha).getTime() : undefined;
    const body = {
      username: this.nombre,
      email: this.email1,
      password: this.clave1,
      birthdate: date !== undefined ? date : undefined,
    };
    return this.http.post(url, body, { observe: 'response'}).toPromise().then(
      response => {
        switch (response.status) {
          case 201:
            this.snackBar.open('Usuario registrado correctamente', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/']);
            break;
          default:
            break;
        }
      }).catch( (error) => {
        switch (error.status) {
          case 400:
            this.snackBar.open('Usuario, contraseña o email requerido', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          case 409:
            this.snackBar.open('Usuario repetido', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          case 500:
            this.snackBar.open('Error interno', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          default:
            break;
        }
      });
  }

  ngOnInit() {
  }

}
