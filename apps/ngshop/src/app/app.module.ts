import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@bluebits/ui';
import { AccordionModule } from 'primeng/accordion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { OrdersModule } from '@bluebits/orders';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from '@bluebits/users';

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent],
    exports: [HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        UiModule,
        AccordionModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        OrdersModule
    ]
})
export class AppModule {}
