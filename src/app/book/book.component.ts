import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Reservation } from '../shared/model/reservation';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenService } from '../shared/services/token.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar,
              private token: TokenService, private dialog: MatDialog) { }

  ngOnInit() {
    this.token.guardian();
    this.getReservations();
  }

  getReservations() {
    const url = 'http://fenw.etsisi.upm.es:10000/reservations';
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

  cancelReservation(rsvId: number) {
    const url = 'http://fenw.etsisi.upm.es:10000/reservations/' + rsvId;
    const tokenKey = this.token.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + tokenKey);
    return this.http.delete(url, { headers, observe: 'response'}).toPromise().then(
      response => {
        switch (response.status) {
          case 204:
            this.snackbar.open('Reserva eliminada correctamente', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.ngOnInit();
            break;
          default:
            break;
        }
      }).catch( (error) => {
      switch (error.status) {
        case 401:
          this.snackbar.open('No estás autorizado para eliminar esta reserva', 'Cerrar',
            { duration: 5000, verticalPosition: 'top', panelClass: ['danger-snackbar'] });
          break;
        case 404:
          this.snackbar.open('No hemos podido localizar la reserva seleccionada', 'Cerrar',
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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: ''
    });
    dialogRef.componentInstance.action = 'eliminar esta reserva';
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cancelReservation(id);
      }
    });
  }

  cancelAllReservations() {
    const url = 'http://fenw.etsisi.upm.es:10000/reservations';
    const tokenKey = this.token.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + tokenKey);
    return this.http.delete(url, { headers, observe: 'response'}).toPromise().then(
      response => {
        switch (response.status) {
          case 204:
            this.snackbar.open('Todas tus reservas han sido eliminadas correctamente', 'Cerrar',
              { duration: 5000, verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.ngOnInit();
            break;
          default:
            break;
        }
      }).catch( (error) => {
      switch (error.status) {
        case 401:
          this.snackbar.open('No estás autorizado para eliminar esta reserva', 'Cerrar',
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

  openDeleteAllDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: ''
    });
    dialogRef.componentInstance.action = 'eliminar todas tus reservas';
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cancelAllReservations();
      }
    });
  }
}
