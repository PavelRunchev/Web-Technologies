import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTechnologiesComponent } from './create-technologies/create-technologies.component';
import { ViewTechnologiesComponent } from './view-technologies/view-technologies';
import { DetailsTechnologyComponent } from './details-technology/details-technology.component';
import { UpdateTechnologyComponent } from "./update-technology/update.component";

const technologiesRoutes: Routes = [
  { path: 'createTechnology', component: CreateTechnologiesComponent },
  { path: 'viewTechnologies', component: ViewTechnologiesComponent },
  { path: 'detailsTechnology/:id', component: DetailsTechnologyComponent },
  { path: 'update/:id', component: UpdateTechnologyComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(technologiesRoutes)],
  exports: [ RouterModule ]
})
export class TechnologyRoutingModule { }