import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService, CategoriesfollowService, Category, Categoryfollow, Product, ProductsService } from '@bluebits/products';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
    selector: 'ui-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categoryfollow: Categoryfollow[] = [];
    endSubs$: Subject<any> = new Subject();
    statistics: number[] = [];
    products: Product[] = [];
    categories: Category[] = [];
    constructor(
        private Categoriesfollowservice: CategoriesfollowService,
        private productService: ProductsService,
        private categoriesService: CategoriesService
    ) {}
    ngOnInit(): void {
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => (this.categoryfollow = categoryfollow));
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => console.log(categoryfollow));
        combineLatest([this.productService.getProductsCount()]).subscribe((values) => {
            this.statistics = values;

            this.categoriesService
                .getCategories()
                .pipe(takeUntil(this.endSubs$))
                .subscribe((cats) => {
                    this.categories = cats;
                });
        });
    }
}
