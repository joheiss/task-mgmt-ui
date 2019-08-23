import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {SharedModule} from './shared/shared.module';
import {TasksModule} from './tasks/tasks.module';
import {AuthModule} from './auth/auth.module';
import { NaviSidebarComponent } from './navi/navi-sidebar/navi-sidebar.component';
import {MatListModule} from '@angular/material';
import { NaviHeaderComponent } from './navi/navi-header/navi-header.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NaviSidebarComponent,
        NaviHeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        TasksModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
