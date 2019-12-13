import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/user/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },

  { path: 'signup', loadChildren: './Users/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './Users/login/login.module#LoginPageModule' },
  { path: 'students', loadChildren: './Academic/Students/students/students.module#StudentsPageModule',canActivate: [AuthGuard]},
  { path: 'registerclass', loadChildren: './Academic/Students/registerclass/registerclass.module#RegisterclassPageModule',canActivate: [AuthGuard]},
  { path: 'schedule', loadChildren: './Academic/Students/schedule/schedule.module#SchedulePageModule',canActivate: [AuthGuard]},
  { path: 'faculties', loadChildren: './Academic/Faculty/faculties/faculties.module#FacultiesPageModule' },
  { path: 'addclass', loadChildren: './Academic/Faculty/addclass/addclass.module#AddclassPageModule'},
  { path: 'viewclass', loadChildren: './Academic/Faculty/viewclass/viewclass.module#ViewclassPageModule' },

 

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
