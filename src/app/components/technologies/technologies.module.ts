import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechnologyComponents } from './index';
import { TechnologyRoutingModule } from './technologies.routing.module';

@NgModule({
  declarations: [ ...TechnologyComponents ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TechnologyRoutingModule
  ],
  exports: [
    ...TechnologyComponents
  ]
})
export class TechnologiesModule { }