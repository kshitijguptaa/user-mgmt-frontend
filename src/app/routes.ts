import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-section/user-profile/user-profile.component';
//user section parent component
import { UserSectionComponent } from './user-section/user-section.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserSectionComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: UserProfileComponent }]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];