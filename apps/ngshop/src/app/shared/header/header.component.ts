import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, CategoriesfollowService, Category, Categoryfollow, Product, ProductsService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ngshop-header',
    templateUrl: './header.component.html'
    // encapsulation: ViewEncapsulation.None // Tắt CSS encapsulation
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
    categories: Category[] = [];
    categoryfollow: Categoryfollow[] = [];
    endSubs$: Subject<any> = new Subject();
    products: Product[] = [];
    // Khai báo biến và thuộc tính cần thiết
    // mobileMenuOpenBtn: NodeListOf<Element>;
    // mobileMenu: NodeListOf<Element>;
    // mobileMenuCloseBtn: NodeListOf<Element>;
    // overlay: Element;
    // ngOnInit(): void {
    //     // khởi tạo
    //     this.mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
    //     this.mobileMenu = document.querySelectorAll('[data-mobile-menu]');
    //     this.mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
    //     this.overlay = document.querySelector('[data-overlay]');
    // }

    constructor(
        private categoriesService: CategoriesService,
        private Categoriesfollowservice: CategoriesfollowService,
        private productsService: ProductsService
    ) {}

    ngAfterViewInit(): void {
        'use strict';

        // modal variables
        const modal = document.querySelector('[data-modal]');
        const modalCloseBtn = document.querySelector('[data-modal-close]');
        const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

        // modal function
        // const modalCloseFunc = function () {
        //     modal.classList.add('closed');
        //     localStorage.setItem('modalClosed', 'true');
        //     localStorage.removeItem('modalClosed'); // Xóa trạng thái đã đóng ngay sau khi đóng modal
        //     notificationToast.classList.add('closed');
        // };

        // window.onload = function () {
        //     if (localStorage.getItem('modalClosed') === 'true') {
        //         notificationToast.classList.add('closed');
        //     }
        // };
        const modalCloseFunc = function () {
            modal.classList.add('closed');
            localStorage.setItem('data-modal-close', 'true');
            notificationToast.classList.add('closed');
        };

        window.onload = function () {
            if (localStorage.getItem('data-modal-close') === 'true') {
                notificationToast.classList.add('closed');
            }
        };

        // modal eventListener
        modalCloseOverlay.addEventListener('click', modalCloseFunc);
        modalCloseBtn.addEventListener('click', modalCloseFunc);

        // notification toast variables
        const notificationToast = document.querySelector('[data-toast]');
        const toastCloseBtn = document.querySelector('[data-toast-close]');

        // notification toast eventListener
        toastCloseBtn.addEventListener('click', function () {
            notificationToast.classList.add('closed');
        });

        // mobile menu variables
        const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
        const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
        const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
        const overlay = document.querySelector('[data-overlay]');

        mobileMenuOpenBtn.forEach((btn, index) => {
            const mobileMenuCloseFunc = () => {
                mobileMenu[index].classList.remove('active');
                overlay.classList.remove('active');
            };

            btn.addEventListener('click', () => {
                mobileMenu[index].classList.add('active');
                overlay.classList.add('active');
            });

            mobileMenuCloseBtn[index].addEventListener('click', mobileMenuCloseFunc);
            overlay.addEventListener('click', mobileMenuCloseFunc);
        });

        // Thực hiện các thao tác sau khi view đã được tạo
        // for (let i = 0; i < this.mobileMenuOpenBtn.length; i++) {
        //     const mobileMenuCloseFunc = () => {
        //         this.mobileMenu[i].classList.remove('active');
        //         this.overlay.classList.remove('active');
        //     };

        //     this.mobileMenuOpenBtn[i].addEventListener('click', () => {
        //         this.mobileMenu[i].classList.add('active');
        //         this.overlay.classList.add('active');
        //     });

        //     this.mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
        //     this.overlay.addEventListener('click', mobileMenuCloseFunc);
        // }

        // accordion variables
        const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
        const accordion = document.querySelectorAll('[data-accordion]');

        for (let i = 0; i < accordionBtn.length; i++) {
            accordionBtn[i].addEventListener('click', function () {
                const clickedBtn = this.nextElementSibling.classList.contains('active');

                for (let i = 0; i < accordion.length; i++) {
                    if (clickedBtn) break;

                    if (accordion[i].classList.contains('active')) {
                        accordion[i].classList.remove('active');
                        accordionBtn[i].classList.remove('active');
                    }
                }

                this.nextElementSibling.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }

    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => (this.categories = categories));
        console.log(this.categories);
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => (this.categoryfollow = categoryfollow));
        this.Categoriesfollowservice.getCategoriesfollow()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categoryfollow) => console.log(categoryfollow));
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => (this.products = products));
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => console.log(products));
    }

    ngOnDestroy() {
        this.endSubs$.next(null);
        this.endSubs$.complete();
    }
}
