import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {StudyFormComponent} from './study-form/study-form.component';

const routes: Routes = [
  {path: 'mathjax', component: MathJaxComponent},
  {path: 'design', component: StudyFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
