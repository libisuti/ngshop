import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService, CategoriesfollowService, Category, Categoryfollow, Product, ProductsService } from '@bluebits/products';
import { Subject, takeUntil, combineLatest } from 'rxjs';

@Component({
    selector: 'ui-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    categoryfollow: Categoryfollow[] = [];
    endSubs$: Subject<any> = new Subject();
    statistics: number[] = [];
    categories: Category[] = [];
    products: Product[] = [];

    constructor(
        private Categoriesfollowservice: CategoriesfollowService,
        private productService: ProductsService,
        private categoriesService: CategoriesService,
        private productsService: ProductsService
    ) {}
    ngOnInit(): void {
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => (this.categoryfollow = categoryfollow));
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => console.log(categoryfollow));
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => (this.categories = categories));
        combineLatest([this.productService.getProductsCount()]).subscribe((values) => {
            this.statistics = values;

            this.categoriesService
                .getCategories()
                .pipe(takeUntil(this.endSubs$))
                .subscribe((cats) => {
                    this.categories = cats;
                });
        });
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));
    }
}
