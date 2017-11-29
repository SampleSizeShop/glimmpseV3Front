import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParametersRepeatedMeasureOutcomeCorrelationsComponent } from './parameters-repeated-measure-outcome-correlations.component';
import {constants} from '../../shared/constants';

const heroesRoutes: Routes = [
  { path: constants.STAGES[20] + '/:meas',  component: ParametersRepeatedMeasureOutcomeCorrelationsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ParametersRepeatedMeasureOutcomeCorrelationsRoutingModule { }
