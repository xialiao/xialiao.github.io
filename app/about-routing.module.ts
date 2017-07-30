import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './about.component';

@NgModule({
    imports: [RouterModule.forChild([
            { path: ':topic', component: AboutComponent },
            { path: '', component: AboutComponent}
        ])],
    exports: [RouterModule]
})

export class AboutRoutingModule {}
