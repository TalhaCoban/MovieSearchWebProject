import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule)},
  { path: 'tv-shows', loadChildren: () => import('./tv-shows/tv-shows.module').then((m) => m.TvShowsModule)},
  { path: 'people', loadChildren: () => import('./people/people.module').then((m) => m.Peoplemodule)},
  { path: 'auth', loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule)},
  { path: '**', component: NotFoundComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
