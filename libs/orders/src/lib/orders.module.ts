import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { ordersRoutes } from './lib.routes';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/orders-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@bluebits/ui';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { UsersModule } from '@bluebits/users';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DropdownModule,
        UiModule,
        FormsModule,
        IonicModule,
        ButtonModule,
        InputNumberModule,
        InputMaskModule,
        UsersModule,
        RouterModule.forChild(ordersRoutes)
    ],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent],
    exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
