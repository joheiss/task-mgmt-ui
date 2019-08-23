import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [SignInComponent, SignUpComponent, SignOutComponent],
    imports: [
        SharedModule,
        AuthRoutingModule,
        HttpClientModule
    ]
})
export class AuthModule {
}
