import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { RegisterComponent } from './register/register.component';
import { CourtsComponent } from './courts/courts.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavBarLoggedComponent } from './nav-bar-logged/nav-bar-logged.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book', component: BookComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courts', component: CourtsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'location', component: LocationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'nav-bar', component: NavigationBarComponent },
  { path: 'nav-bar-logged', component: NavBarLoggedComponent },
  { path: 'booking', component: BookingComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
