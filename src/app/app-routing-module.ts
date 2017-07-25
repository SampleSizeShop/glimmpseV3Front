import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {OutcomesFormComponent} from './outcomes-form/outcomes-form.component';

const routes: Routes = [
  {path: 'mathjax', component: MathJaxComponent},
  {path: 'outcomes', component: OutcomesFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
