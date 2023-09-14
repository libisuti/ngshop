import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endsubs$: Subject<any> = new Subject();
    constructor(
        private confirmationService: ConfirmationService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }
    ngOnDestroy() {
        this.endsubs$.next(null);
        console.log('category destroy');
        this.endsubs$.complete();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Category?',
            header: 'Delete Category',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    (response) => {
                        this._getCategories();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not deleted' });
                    }
                );
            },
            reject: (type) => {},
            key: 'positionDialog'
        });
    }

    updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`);
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.categories = cats;
            });
    }
}
