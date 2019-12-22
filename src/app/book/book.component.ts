import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Reservation } from '../shared/model/reservation';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private token: TokenService) { }

  ngOnInit() {
    this.token.guardian();
    this.getReservations();
  }

  getReservations() {
    const url = 'http://fenw.etsisi.upm.es:10000/reservations';
    const tokenKey = localStorage.getItem('token_key');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + tokenKey);
    return this.http.get(url, { headers, observe: 'response', responseType: 'json'}).toPromise().then(
      (response: any) => {
        switch (response.status) {
          case 200:
            const jwt = response.headers.get('Authorization');
            localStorage.setItem('token_key', jwt.replace('Bearer ', ''));
            this.reservations = response.body;
            break;
          default:
            break;
        }
      }).catch( (error) => {
      switch (error.status) {
        case 401:
          this.snackbar.open('No estás autorizado para hacer esta solicitud', 'Aceptar',
            { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
          this.router.navigate(['/start']);
          break;
        case 500:
          this.snackbar.open('Error interno. Por favor, inténtalo de nuevo más tarde', 'Aceptar',
            { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
          this.router.navigate(['/start']);
          break;
        default:
          break;
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.reservations, event.previousIndex, event.currentIndex);
  }

  cancelReservation() {
    const url = 'http://fenw.etsisi.upm.es:10000/reservations/' + this.id;
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
}
