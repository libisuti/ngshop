import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@bluebits/orders';
import { Product, ProductsService } from '@bluebits/products';

import { Observable, Subject, interval, map, takeUntil } from 'rxjs';

@Component({
    selector: 'ui-product-featured',
    templateUrl: './product-featured.component.html',
    styleUrls: ['./product-featured.component.scss']
})
export class ProductFeaturedComponent implements OnInit, OnDestroy {
    currentTime$!: Observable<Date>;
    endSubs$: Subject<any> = new Subject();
    products: Product[] = [];
    @Input() product!: Product;

    constructor(private productsService: ProductsService, private cartService: CartService) {}
    addProductToCart(product: Product) {
        const cartItem = {
            productId: product.id,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);
    }
    ngOnInit(): void {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));

        this.currentTime$ = interval(1000).pipe(map(() => new Date()));
        console.log(this.product);
    }

    ngOnDestroy() {
        this.endSubs$.next(null);
        this.endSubs$.complete();
    }
}
