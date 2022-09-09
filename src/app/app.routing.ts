import {SignupComponent} from './modules/recruitment-public/signup/signup.component';
import {ActiveAccountComponent} from './modules/recruitment-public/signup/active-account/active-account.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './@core/guards/auth.guard';
import {
  ProfileUserPublicComponent,
} from './modules/recruitment-public/profile-user-public/profile-user-public.component';
import {DetaileJobPComponent} from './modules/recruitment-public/detal-job-public/detail-job-public.component';
import {PopupApply} from './modules/recruitment-public/popup-apply/popup-apply.component';
import {
  ChangeThePasswordPublicComponent,
} from './modules/recruitment-public/change-the-password-public/change-the-password-public.component';


export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // { path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  // { path: '**',
  //   redirectTo: 'home',
  // },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./modules/recruitment-public/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule,
      ),
  },
  {
    path: 'change-password',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./modules/recruitment-public/forgot-password/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile-public',
    component: ProfileUserPublicComponent,
  },
  {
    path: 'public-job/detail/:id',
    component: DetaileJobPComponent,
  },
  {
    path: 'active',
    component: ActiveAccountComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/recruitment-public/recruitment-public.module').then((m) => m.RecruitmentPublicModule),
  },
  {
    path: 'public-job/apply/:id',
    component: PopupApply,
  },
  {
    path: 'change-the-password-public',
    component: ChangeThePasswordPublicComponent,
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
