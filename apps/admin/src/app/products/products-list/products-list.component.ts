import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, CategoriesfollowService, Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products = [];
    categories = [];

    selectedCategory: string;
    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private Categoriesfollowservice: CategoriesfollowService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getProducts();
        this.getCategories();
    }

    private _getProducts() {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.productsService.deleteProduct(productId).subscribe(
                    (response) => {
                        this._getProducts();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not deleted' });
                    }
                );
            },
            reject: (type) => {},
            key: 'positionDialog'
        });
    }

    updateProduct(productid: string) {
        this.router.navigateByUrl(`products/form/${productid}`);
    }

    getCategories() {
        this.Categoriesfollowservice.getCategoriesfollow().subscribe((categories) => (this.categories = categories));
    }

    onCategoryChange() {
        if (this.selectedCategory === 'all') {
            // Hiển thị tất cả sản phẩm
            this.productsService.getProducts().subscribe((products) => (this.products = products));
        } else {
            // Hiển thị sản phẩm theo danh mục được chọn
            this.productsService.getProductsByCategory(this.selectedCategory).subscribe((products) => (this.products = products));
        }
    }
}
