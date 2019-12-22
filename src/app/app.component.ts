import { Component, OnInit } from '@angular/core';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'club-de-padel-registro-y-reserva-alejandro';

  constructor(private token: TokenService) {
  }

  ngOnInit() {
  }
}

