import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';
import { CartService, CartItem } from '@bluebits/orders';

@Component({
    selector: 'ui-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product!: Product;
    endSubs$: Subject<any> = new Subject();
    quantity = 1;
    constructor(private route: ActivatedRoute, private prodService: ProductsService, private cartService: CartService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this._getProduct(params['id']);
            }
        });
    }

    ngOnDestroy(): void {
        this.endSubs$.next(null);
        this.endSubs$.complete();
    }
    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
    }

    private _getProduct(id: string) {
        this.prodService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
            });
    }
}
