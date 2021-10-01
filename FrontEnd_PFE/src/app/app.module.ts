import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BlankTemplateComponent } from "./components/template/blank-template.component";
import { LeftNavTemplateComponent } from "./components/template/left-nav-template.component";
import { AppRoutingModule, routes } from "./app.routing";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { NavigationComponent } from "./components/shared/navigation/navigation.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/shared/footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { PipesModule } from 'pipes-module';
import { NavbarComponent } from './components/navbar/navbar.component';
//import { TranslateModule } from '@ngx-translate/core';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PriceComponent } from './components/price/price.component';


import { TranslateModule , TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  // tslint:disable-next-line:no-unused-expression
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    BlankTemplateComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftNavTemplateComponent,
    NavigationComponent,
    FooterComponent,
    WelcomeComponent,
    LoginUserComponent,
    LoginAdminComponent,
    RegisterUserComponent,
    RegisterAdminComponent,
    ForgotPasswordComponent,
    AddPlaceComponent,
    NavbarComponent,
    InscriptionComponent,
    PriceComponent,
   



],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterTestingModule,
    MatDialogModule,
    CommonModule,
    BrowserModule,
    PipesModule,
    TranslateModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
