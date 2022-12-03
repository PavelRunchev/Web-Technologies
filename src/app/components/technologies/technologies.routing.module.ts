import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CreateTechnologiesComponent } from './create-technologies/create-technologies.component';
import { TechnologyIDComponent } from './technology-id/technology-id.component';


const technologiesRoutes: Routes = [
  { path: 'createTechnology', component: CreateTechnologiesComponent },
  { path: 'detailsTechnology/:id', component: TechnologyIDComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(technologiesRoutes)
  ],
  exports: [ RouterModule ]
})
export class TechnologyRoutingModule { }