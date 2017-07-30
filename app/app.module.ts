import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { OccupationsComponent } from './occupations.component';
import { FastDeclineComponent } from './fastdecline.component';
import { MostDeclineComponent } from './mostdecline.component';
import { FastGrowComponent } from './fastgrow.component';
import { MostGrowComponent } from './mostgrow.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot()
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    OccupationsComponent,
    FastGrowComponent,
    FastDeclineComponent,
    MostDeclineComponent,
    MostGrowComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
