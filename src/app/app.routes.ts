import { Routes } from '@angular/router';
import { LoginComponent } from './domains/auth/login/login.component';
import { RegisterComponent } from './domains/auth/register/register.component';
import { ListComponent } from './domains/events/pages/list/list.component';
import { SidebarComponent } from './domains/shared/components/sidebar/sidebar.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'list',
    component: ListComponent,
  },
  {
    path:'side',
    component:SidebarComponent
  }
];
