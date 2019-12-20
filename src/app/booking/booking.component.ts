import { Component, OnInit } from '@angular/core';
import { Reservation } from '../shared/model/reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Time } from '../shared/model/time';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  date: string | undefined;
  reservations: Reservation[] = [];
  availables: Reservation[] = [];

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  getAvailableByDay() {
    this.reservations = [];
    this.availables = [];
    this.getAllPossibleCombinationsByDay();
    this.getReservationsByDay().then( () =>
      this.reservations.map( r => {
        this.availables.map( a => {
          if (r.rsvtime === a.rsvtime && r.courtId === a.courtId) {
            this.availables.splice(this.availables.indexOf(a), 1);
          }
        });
      })).catch( () => {
        this.snackbar.open('Error interno', 'Aceptar', { duration: 5000, verticalPosition: 'top' });
      }
    );
  }

  getReservationsByDay() {
    if (this.date !== undefined && this.date !== null && this.date !== '') {
      const stringDate = this.date ? this.date.split(' ')[0] : undefined;
      const date = stringDate ? new Date(stringDate).getTime() : undefined;
      const url = 'http://fenw.etsisi.upm.es:10000/reservations/' + date;
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
              { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/start']);
            break;
          case 500:
            this.snackbar.open('Error interno. Por favor, inténtalo de nuevo más tarde', 'Aceptar',
              { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/start']);
            break;
          default:
            break;
        }
      });
    }
  }

  getAllPossibleCombinationsByDay() {
    if (this.date !== undefined && this.date !== null && this.date !== '') {
      const date = this.date !== undefined ? new Date(this.date).getTime() : undefined;
      const courts: number[] = [1, 2, 3, 4];
      let reser: Reservation = new Reservation();
      const time = new Time();
      time.hours.map( h => {
          courts.forEach(c => {
            reser = new Reservation();
            reser.courtId = c;
            reser.rsvtime = h;
            this.availables.push(reser);
          });
      });
    }
  }

  postReservation() {
    if (this.date !== undefined && this.date !== null && this.date !== '') {
      const date = this.date !== undefined ? new Date(this.date).getTime() : undefined;
      const url = 'http://fenw.etsisi.upm.es:10000/reservations/' + date;
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
              { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/start']);
            break;
          case 500:
            this.snackbar.open('Error interno. Por favor, inténtalo de nuevo más tarde', 'Aceptar',
              { duration: 5000, verticalPosition: 'top' });
            this.router.navigate(['/start']);
            break;
          default:
            break;
        }
      });
    }
  }
}