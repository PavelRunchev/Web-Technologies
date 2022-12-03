import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedComponents } from './index';

@NgModule({
    declarations: [ ...SharedComponents ],
    imports: [ 
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        ...SharedComponents,
        RouterModule
    ]
})
export class SharedModule { }