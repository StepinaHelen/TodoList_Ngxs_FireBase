import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {firebaseConfig } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { TodoListState } from "./store/todolist.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxsModule.forRoot([TodoListState]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
