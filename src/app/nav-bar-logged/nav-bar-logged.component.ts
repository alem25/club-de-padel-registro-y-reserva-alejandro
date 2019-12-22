import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-nav-bar-logged',
  templateUrl: './nav-bar-logged.component.html',
  styleUrls: ['./nav-bar-logged.component.css']
})
export class NavBarLoggedComponent implements OnInit {

  usernameLogged;
  usernameNiceName;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog,
              private snackbar: MatSnackBar, private token: TokenService) { }

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
    const tokenKey = this.token.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + tokenKey);
    return this.http.delete(url, { headers, observe: 'response'}).toPromise().then(
        response => {
          switch (response.status) {
            case 204:
              this.snackbar.open('Usuario eliminado correctamente', 'Cerrar',
                { duration: 5000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
              this.logout();
              break;
            default:
              break;
          }
        }).catch( (error) => {
        switch (error.status) {
          case 401:
            this.snackbar.open('No estás autorizado para eliminar este usuario', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          case 500:
            this.snackbar.open('Error interno', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          default:
            break;
        }
      });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });
    dialogRef.componentInstance.action = 'eliminar tu cuenta de usuario';
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  obtainUserLogged() {
    const decoded = JSON.parse(atob(this.token.getToken().split('.')[1]));
    this.usernameLogged = decoded !== undefined ? decoded.username : '';
    this.usernameNiceName = decoded !== undefined ? 'Mi cuenta: ' + decoded.username : '';
  }
}
