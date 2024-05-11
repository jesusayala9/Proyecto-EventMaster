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
import { UserInfoComponent } from './domains/auth/components/user-info/user-info.component';
import { EventFormComponent } from './domains/events/components/event-form/event-form.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'my-events',
    component: ListComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'search',
    component: SearchbarComponent,
  },

  {
    path: 'search-events',
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
  {
    path:'user-info',
    component: UserInfoComponent
  },
  {
    path:'event-form',
    component: EventFormComponent
  }
];
