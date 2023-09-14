import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@bluebits/products';
import { Observable, Subject, takeUntil, interval, map } from 'rxjs';

@Component({
    selector: 'ui-product-main',
    templateUrl: './product-main.component.html',
    styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit, OnDestroy {
    currentTime$!: Observable<Date>;
    endSubs$: Subject<any> = new Subject();
    products: Product[] = [];
    constructor(private productsService: ProductsService) {}
    ngOnInit(): void {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));
        this.currentTime$ = interval(1000).pipe(map(() => new Date()));
    }
    ngOnDestroy() {
        this.endSubs$.next(null);
        this.endSubs$.complete();
    }
}
