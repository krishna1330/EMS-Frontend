import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { AssetsComponent } from './assets/assets.component';
import { VenueComponent } from './venue/venue.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FormsModule } from '@angular/forms';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/assets', pathMatch: 'full' },
//   { path: 'assets', component: AssetsComponent },
//   { path: 'venue', component: VenueComponent },
//   { path: 'bookings', component: BookingsComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    BodyComponent,
    AssetsComponent,
    VenueComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    //RouterModule.forRoot(appRoutes, {useHash:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
