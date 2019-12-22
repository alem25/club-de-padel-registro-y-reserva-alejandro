import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  storeToken(jwt: string): void {
    if (jwt !== null) {
      localStorage.setItem('token_key', jwt.replace('Bearer ', ''));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token_key');
  }

  isAuthorized(): boolean {
    const token = this.getToken();
    if (token !== null && token !== '') {
      const base64Url = token.split('.')[1];
      const decodedValue = JSON.parse(window.atob(base64Url));
      const expDate = decodedValue.exp;
      const today = Date.now();
      return today < expDate * 1000;
    }
  }

  guardian(): void {
    const token = this.getToken();
    if (token !== null && token !== '') {
      const base64Url = token.split('.')[1];
      const decodedValue = JSON.parse(window.atob(base64Url));
      const expDate = decodedValue.exp;
      const today = Date.now();
      const result = today < expDate * 1000;
      if (result) {
      } else {
        this.notAuthorized();
      }
    } else {
      this.notAuthorized();
    }
  }

  notAuthorized(): void {
    this.snackbar.open('No estás autorizado para hacer esta solicitud', 'Cerrar',
      { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar']});
    this.router.navigate(['start']);
  }
}
