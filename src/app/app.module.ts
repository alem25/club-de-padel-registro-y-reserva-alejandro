import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourtsComponent } from './courts/courts.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { NavBarLoggedComponent } from './nav-bar-logged/nav-bar-logged.component';
import { DialogComponent } from './dialog/dialog.component';
import { BookingComponent } from './booking/booking.component';
import { TokenService } from './shared/services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    CourtsComponent,
    ServicesComponent,
    LocationComponent,
    AboutComponent,
    FooterComponent,
    CookiesComponent,
    NavigationBarComponent,
    BookComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent,
    NavBarLoggedComponent,
    DialogComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatButtonModule,
    DragDropModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
