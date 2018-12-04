import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: '',   redirectTo: '/design/STUDY_TITLE', pathMatch: 'full' },
  { path: '**',   redirectTo: '/design/STUDY_TITLE', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
