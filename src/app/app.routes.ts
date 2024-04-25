import { Routes } from '@angular/router';
import { LoginComponent } from './domains/auth/components/login/login.component';
import { RegisterComponent } from './domains/auth/components/register/register.component';
import { ListComponent } from './domains/events/pages/list/list.component';
import { SidebarComponent } from './domains/shared/components/sidebar/sidebar.component';
import { SearchbarComponent } from './domains/shared/components/searchbar/searchbar.component';
import { AppComponent } from './app.component';
import { SearchedComponent } from './domains/events/pages/searched/searched.component';
import { EventCardComponent } from './domains/events/components/event-card/event-card.component';
import { EventComponent } from './domains/events/components/event/event.component';

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
    path: '',
    component: AppComponent,
  },
  {
    path: 'search',
    component: SearchbarComponent,
  },

  {
    path: 'search-c',
    component: SearchedComponent,
  },

  {
    path: 'event-card',
    component: EventCardComponent,
  },

  {
    path: 'event',
    component: EventComponent,
  },
];
