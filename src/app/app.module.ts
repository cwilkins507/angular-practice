import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WelcomeComponent} from "./home/welcome.component";
import {RouterModule} from "@angular/router";
import {ProductModule} from './products/product.module';

@NgModule({
  // those we created
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  // others or thirdparties
  imports: [
    BrowserModule,
    HttpClientModule,
    // configure routes, order matters (will pick first match)
    // leave off the leading slash, use '' for default, ** for wildcard
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: "full"},
      { path: '**', redirectTo: 'welcome', pathMatch: "full"}
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
