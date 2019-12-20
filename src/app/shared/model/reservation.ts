export class Reservation {
  rsvId: number | undefined;
  courtId: number | undefined;
  rsvdateTime: number | undefined;
  rsvday: string | undefined;
  rsvtime: string | undefined;

  constructor(response?: any) {
    this.rsvId = response ? response.rsvId : undefined;
    this.courtId = response ? response.courtId : undefined;
    this.rsvdateTime = response ? response.rsvdateTime : undefined;
    this.rsvday = response ? response.rsvday : undefined;
    this.rsvtime = response ? response.rsvtime : undefined;
  }
}
