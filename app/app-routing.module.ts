import { NgModule }             from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent }   from './home.component';
import { AboutModule }   from './about.module';
import { OccupationsComponent } from './occupations.component';
import { FastGrowComponent } from './fastgrow.component';
import { FastDeclineComponent } from './fastdecline.component';
import { MostDeclineComponent } from './mostdecline.component';
import { MostGrowComponent } from './mostgrow.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',     component: HomeComponent },
  { path: 'about', loadChildren: 'app/about.module#AboutModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
        useHash: true,
        preloadingStrategy: PreloadAllModules
    })],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}