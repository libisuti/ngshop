import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ui-you-also-may-like',
    templateUrl: './you-also-may-like.component.html',
    styleUrls: ['./you-also-may-like.component.scss']
})
export class YouAlsoMayLikeComponent implements OnInit {
    endSubs$: Subject<any> = new Subject();

    products: Product[] = [];
    constructor(private productService: ProductsService) {}
    ngOnInit(): void {
        this.productService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));
    }
}
