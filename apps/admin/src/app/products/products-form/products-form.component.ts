import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, CategoriesfollowService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { __values } from 'tslib';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editmode = false;
    form: FormGroup;
    isSubmited = false;
    categories = [];

    imageDisplay: string | ArrayBuffer;
    currentProductID: string;

    constructor(
        private formBuiler: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private Categoriesfollowservice: CategoriesfollowService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getcategories();
        this._checkEditMode();
    }
    private _initForm() {
        this.form = this.formBuiler.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getcategories() {
        this.Categoriesfollowservice.getCategoriesfollow().subscribe((categories) => {
            this.categories = categories;
        });
    }

    private _addProduct(productData: FormData) {
        this.productsService.createProduct(productData).subscribe(
            (product: Product) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is created` });
                timer(2000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not Created' });
            }
        );
    }

    private _updateProduct(productFormData: FormData) {
        this.productsService.updateProduct(productFormData, this.currentProductID).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product  is updated` });
                timer(2000)
                    .toPromise()
                    .then((done) => {
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not Updated' });
            }
        );
    }
    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentProductID = params.id;
                this.productsService.getProduct(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.category.setValue(product.category.id);

                    this.productForm.brand.setValue(product.brand);
                    this.productForm.price.setValue(product.price);
                    this.productForm.countInStock.setValue(product.countInStock);
                    this.productForm.isFeatured.setValue(product.isFeatured);
                    this.productForm.description.setValue(product.description);
                    this.productForm.richDescription.setValue(product.richDescription);
                    this.imageDisplay = product.image;
                    this.productForm.image.setValidators([]);
                    this.productForm.image.updateValueAndValidity();
                });
            }
        });
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.form.invalid) return;

        // FormData chỉ dùng cho multipart/form-data

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });

        if (this.editmode) {
            this._updateProduct(productFormData);
        } else {
            this._addProduct(productFormData);
        }
    }

    onCancle() {
        this.location.back();
    }
    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    get productForm() {
        return this.form.controls;
    }
}
