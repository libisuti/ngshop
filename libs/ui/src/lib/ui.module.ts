import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductMinimalComponent } from './product/product-minimal/product-minimal.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { UiRoute } from './ui.routes';
import { HomePageComponent } from './home-page/home-page.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ProductFeaturedComponent } from './product/product-featured/product-featured.component';
import { IonicModule } from '@ionic/angular';
import { ProductMainComponent } from './product/product-main/product-main.component';
import { TESTIMONIALSCTASERVICEComponent } from './product/testimonialsctaservice/testimonialsctaservice.component';
import { YouAlsoMayLikeComponent } from './you-also-may-like/you-also-may-like.component';

@NgModule({
    imports: [CommonModule, ButtonModule, IonicModule, InputNumberModule, RatingModule, FormsModule, RouterModule.forRoot(UiRoute)],
    declarations: [
        BannerComponent,
        SliderComponent,
        MainComponent,
        CategoryComponent,
        ProductComponent,
        ProductMinimalComponent,
        ProductDetailsComponent,
        HomePageComponent,
        ProductFeaturedComponent,
        ProductMainComponent,
        TESTIMONIALSCTASERVICEComponent,
        YouAlsoMayLikeComponent
    ],
    exports: [BannerComponent, SliderComponent, MainComponent, YouAlsoMayLikeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiModule {}
