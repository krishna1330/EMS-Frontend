import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { VenueComponent } from './venue/venue.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  { path: '', redirectTo: '/assets', pathMatch: 'full' },
  { path: 'assets', component: AssetsComponent },
  { path: 'venue', component: VenueComponent },
  { path: 'bookings', component: BookingsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
