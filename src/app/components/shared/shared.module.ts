import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SharedComponents } from './index';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@NgModule({
    declarations: [ ...SharedComponents ],
    imports: [ 
        CommonModule,
        RouterModule,
        LazyLoadImageModule,
        MdbCarouselModule,
        MdbDropdownModule,
        MdbFormsModule
    ],
    exports: [
        CommonModule,
        ...SharedComponents,
        RouterModule
    ]
})
export class SharedModule { }