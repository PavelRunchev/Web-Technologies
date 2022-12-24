import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SharedComponents } from './index';

@NgModule({
    declarations: [ ...SharedComponents ],
    imports: [ 
        CommonModule,
        RouterModule,
        LazyLoadImageModule
    ],
    exports: [
        CommonModule,
        ...SharedComponents,
        RouterModule
    ],

    providers: [...SharedComponents]
})
export class SharedModule { }