import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssambleTeamComponent } from './assamble-team/assamble-team.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { RosterComponent } from './roster/roster.component';


const routes: Routes = [
  { path: 'assamble-team', component: AssambleTeamComponent },
  { path: 'my-team', component: MyTeamComponent },
  { path: 'my-team/:id', component: MyTeamComponent },
  { path: 'roster', component: RosterComponent },
  { path: '',   redirectTo: '/assamble-team', pathMatch: 'full' },
 {path: '**', redirectTo: '/my-team'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
