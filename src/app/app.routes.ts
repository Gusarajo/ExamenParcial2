import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot/forgot.page').then(m => m.ForgotPage)
  },
  {
    path: 'cal',
    loadComponent: () => import('./cal/cal.page').then(m => m.CalPage)
  },

];
