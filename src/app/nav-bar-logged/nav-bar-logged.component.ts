import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-nav-bar-logged',
  templateUrl: './nav-bar-logged.component.html',
  styleUrls: ['./nav-bar-logged.component.css']
})
export class NavBarLoggedComponent implements OnInit {

  usernameLogged;
  usernameNiceName;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obtainUserLogged();
    this.router.navigate(['/start']);
  }

  logout() {
    try {
      window.localStorage.removeItem('token_key');
      this.router.navigate(['/start']);
    } catch {}
  }

  deleteAccount() {
    const url = 'http://fenw.etsisi.upm.es:10000/users/' + this.usernameLogged;
    const tokenKey = localStorage.getItem('token_key');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + tokenKey);
    return this.http.delete(url, { headers, observe: 'response'}).toPromise().then(
        response => {
          switch (response.status) {
            case 204:
              this.snackBar.open('Usuario eliminado correctamente', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
              this.logout();
              break;
            default:
              break;
          }
        }).catch( (error) => {
        switch (error.status) {
          case 401:
            this.snackBar.open('No estás autorizado para eliminar este usuario', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          case 500:
            this.snackBar.open('Error interno', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
            break;
          default:
            break;
        }
      });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  obtainUserLogged() {
    const decoded = JSON.parse(window.atob(window.localStorage.getItem('token_key').split('.')[1]));
    this.usernameLogged = decoded !== undefined ? decoded.username : '';
    this.usernameNiceName = decoded !== undefined ? 'Mi cuenta: ' + decoded.username : '';
  }
}
