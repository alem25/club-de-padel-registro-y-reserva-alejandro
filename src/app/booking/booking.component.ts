import { Component, OnInit } from '@angular/core';
import { Reservation } from '../shared/model/reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Time } from '../shared/model/time';
import { DialogComponent } from '../dialog/dialog.component';
import { TokenService } from '../shared/services/token.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  min: Date;
  max: Date;
  date: string | undefined;
  reservations: Reservation[] = [];
  availables: Reservation[] = [];
  bookcourtid: string;
  bookrsvtime: string;

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar,
              private dialog: MatDialog, private token: TokenService) { }
  private url: string = environment.url + 'reservations';

  ngOnInit() {
    this.token.guardian();
    this.min = new Date();
    this.max = new Date();
    this.max.setFullYear(this.max.getFullYear() + 1);
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
        this.snackbar.open('Error interno', 'Cerrar',
          { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
      }
    );
  }

  getReservationsByDay() {
    if (this.date !== undefined && this.date !== null && this.date !== '') {
      const stringDate = this.date ? this.date.split(' ')[0] : undefined;
      const date = stringDate ? new Date(stringDate).getTime() : undefined;
      const url = this.url + '/' + date;
      const tokenKey = this.token.getToken();
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + tokenKey);
      return this.http.get(url, { headers, observe: 'response', responseType: 'json'}).toPromise().then(
        (response: any) => {
          switch (response.status) {
            case 200:
              const jwt = response.headers.get('Authorization');
              this.token.storeToken(jwt);
              this.reservations = response.body;
              break;
            default:
              break;
          }
        }).catch( (error) => {
        switch (error.status) {
          case 401:
            this.snackbar.open('No estás autorizado para hacer esta solicitud', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: '[danger-snackbar]' });
            this.router.navigate(['/start']);
            break;
          case 500:
            this.snackbar.open('Error interno. Por favor, inténtalo de nuevo más tarde', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: '[danger-snackbar]' });
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

  book(time: string, court: string) {
    this.bookrsvtime = time;
    this.bookcourtid = court;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: ''
    });
    dialogRef.componentInstance.action = 'reservar esta plaza';
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.postReservation();
      }
    });
  }

  postReservation() {
    if (this.date !== undefined && this.date !== null && this.date !== '') {
      let stringDate = this.date ? this.date.split(' ')[0] : undefined;
      stringDate = stringDate + ' ' + this.bookrsvtime;
      const date: number | undefined = stringDate ? new Date(stringDate).getTime() : undefined;
      const tokenKey = localStorage.getItem('token_key');
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + tokenKey);
      const body = {
        courtid: +this.bookcourtid,
        rsvdatetime: +date,
      };
      return this.http.post(this.url, body, { headers, observe: 'response', responseType: 'json' })
        .subscribe(
        response => {
          switch (response.status) {
            case 200:
            case 201:
            case 204:
              const jwt = response.headers.get('Authorization');
              this.token.storeToken(jwt);
              this.router.navigate(['/book']);
              this.snackbar.open('¡Plaza reservada!', 'Aceptar',
                { duration: 5000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
              break;
            default:
              break;
          }
        }, error => {
        switch (error.status) {
          case 400:
            this.snackbar.open('La pista o la fecha de la reserva no son válidas', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          case 401:
            this.snackbar.open('No estás autorizado para hacer esta solicitud', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            this.router.navigate(['/']);
            break;
          case 409:
            this.snackbar.open('Haz alcanzado el límite máximo de reservas', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            break;
          case 500:
            this.snackbar.open('Error interno. Por favor, inténtalo de nuevo más tarde', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
            this.router.navigate(['/']);
            break;
          default:
            break;
        }
      });
    }
  }
}
