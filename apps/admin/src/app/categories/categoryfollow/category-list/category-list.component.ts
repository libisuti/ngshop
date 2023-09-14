import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, CategoriesfollowService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryFollowListComponent implements OnInit {
    products = [];
    categories = [];

    selectedCategory: string;
    constructor(
        private Categoriesfollowservice: CategoriesfollowService,
        private categoriesService: CategoriesService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getCategories();
        this.getCategories();
    }

    private _getCategories() {
        this.Categoriesfollowservice.getCategoriesfollow().subscribe((products) => {
            this.products = products;
        });
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.Categoriesfollowservice.deleteCategory(productId).subscribe(
                    (response) => {
                        this._getCategories();
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

    // updateProduct(productid: string) {
    //     this.router.navigateByUrl(`categoryfollow/form/${productid}`);
    // }

    getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => (this.categories = categories));
    }

    onCategoryChange() {
        if (this.selectedCategory === 'all') {
            // Hiển thị tất cả sản phẩm
            this.Categoriesfollowservice.getCategoriesfollow().subscribe((products) => (this.products = products));
        } else {
            // Hiển thị sản phẩm theo danh mục được chọn
            this.Categoriesfollowservice.getProductsByCategory(this.selectedCategory).subscribe((products) => (this.products = products));
        }
    }
}
