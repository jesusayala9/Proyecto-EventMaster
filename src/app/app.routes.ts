import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './domains/layout/layout.component';
import { LoginComponent } from './domains/auth/components/login/login.component';
import { ListComponent } from './domains/events/pages/list/list.component';
import { SearchedComponent } from './domains/events/pages/searched/searched.component';
import { UserInfoComponent } from './domains/auth/components/user-info/user-info.component';
import { NgModule } from '@angular/core';
import { EventFormComponent } from './domains/events/components/event-form/event-form.component';
import { RegisterComponent } from './domains/auth/components/register/register.component';
import { EventCardComponent } from './domains/events/components/event-card/event-card.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'search-events', pathMatch: 'full' },
      {
        path: 'search-events',
        component: SearchedComponent,
      },
      {
        path: 'user-info',
        component: UserInfoComponent,
      },
      {
        path: 'my-events',
        component: ListComponent,
      },
      {
          path:'event-form',
          component: EventFormComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
      path: 'event-card',
      component: EventCardComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// {
//   path: 'login',
//   component: LoginComponent,
// },

// {
//   path: 'my-events',
//   component: ListComponent,
// },
// {
//   path: '',
//   component: LayoutComponent,
// },
// {
//   path: 'search',
//   component: SearchbarComponent,
// },

// {
//   path: 'search-events',
//   component: SearchedComponent,
// },

// {
//   path: 'event-card',
//   component: EventCardComponent,
// },

// {
//   path: 'event',
//   component: EventComponent,
// },
// {
//   path:'user-info',
//   component: UserInfoComponent
// },
// {
//   path:'event-form',
//   component: EventFormComponent
