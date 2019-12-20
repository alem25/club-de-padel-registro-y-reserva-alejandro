export class Reservation {
  rsvId: number;
  courtId: number;
  rsvdateTime: number;
  rsvday: string;
  rsvtime: string;

  constructor(response: any) {
    this.rsvId = response.rsvId;
    this.courtId = response.courtId;
    this.rsvdateTime = response.rsvdateTime;
    this.rsvday = response.rsvday;
    this.rsvtime = response.rsvtime;
  }
}

export class ReservationArray {
  reservations: Reservation[];
}
