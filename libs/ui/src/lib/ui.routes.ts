import { Route } from '@angular/router';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

import { HomePageComponent } from './home-page/home-page.component';

export const UiRoute: Route[] = [
    {
        path: '',
        component: HomePageComponent
    },

    {
        path: 'product/:id',
        component: ProductDetailsComponent
    }
];
