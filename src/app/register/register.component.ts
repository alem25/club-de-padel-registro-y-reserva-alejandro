import { Component, OnInit } from '@angular/core';
import {generateErrorMessage} from 'codelyzer/angular/styles/cssLexer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  CompruebaPass() {
    const contraseña1 = document.getElementById('contraseña1');
    const contraseña2 = document.getElementById('contraseña2');

    if (contraseña1 !== contraseña2) {
      return 'Las contraseñas no coinciden';
      // return;
    } else {
      return '';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
