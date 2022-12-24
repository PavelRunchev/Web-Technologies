import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponents } from './index';

import { AuthGuard } from './auth.guard';

@NgModule({
    declarations: [ ...UserComponents ],
    imports: [ 
        CommonModule,
        RouterModule,
        LazyLoadImageModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        ...UserComponents,
        RouterModule
    ],

    providers: [...UserComponents, AuthGuard]
})
export class UserModule { }