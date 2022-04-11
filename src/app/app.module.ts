import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {firebaseConfig } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from "@angular/forms";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { ListComponent } from './components/list/list.component';

@NgModule({
    declarations: [AppComponent, ListComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
