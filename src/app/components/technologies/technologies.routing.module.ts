import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../user/auth.guard';

import { CreateTechnologiesComponent } from './create-technologies/create-technologies.component';
import { ViewTechnologiesComponent } from './view-technologies/view-technologies';
import { DetailsTechnologyComponent } from './details-technology/details-technology.component';
import { UpdateTechnologyComponent } from "./update-technology/update.component";

const technologiesRoutes: Routes = [
  { path: 'createTechnology', component: CreateTechnologiesComponent, canActivate: [AuthGuard] },
  { path: 'viewTechnologies', component: ViewTechnologiesComponent, canActivate: [AuthGuard] },
  { path: 'detailsTechnology/:id', component: DetailsTechnologyComponent, canActivate: [AuthGuard] },
  { path: 'updateTechnology/:id', component: UpdateTechnologyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(technologiesRoutes)],
  exports: [ RouterModule ]
})
export class TechnologyRoutingModule { }