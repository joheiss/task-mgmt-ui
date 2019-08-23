import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {AppComponent} from '../app.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AppComponent,
        children: [
            {path: 'signin', component: SignInComponent},
            {path: 'signup', component: SignUpComponent},
            {path: 'signout', component: SignOutComponent},
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}
