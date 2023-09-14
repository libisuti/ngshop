import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ui-product-minimal',
    templateUrl: './product-minimal.component.html',
    styleUrls: ['./product-minimal.component.scss']
})
export class ProductMinimalComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    products: Product[] = [];

    @Input() product!: Product;

    constructor(private productsService: ProductsService) {}
    ngOnInit(): void {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));
    }
    ngOnDestroy() {
        this.endSubs$.next(null);
        this.endSubs$.complete();
    }
}
