import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, CategoriesfollowService, Categoryfollow } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html'
})
export class CategoryFollowFormComponent implements OnInit {
    editmode = false;
    form: FormGroup;
    isSubmited = false;
    categories = [];
    currentCategoryID: string;
    imageDisplay: string | ArrayBuffer;

    constructor(
        private formBuiler: FormBuilder,

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
            categories: ['', Validators.required],
            image: ['', Validators.required]
        });
    }

    private _getcategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    private _addProduct(productData: FormData) {
        this.Categoriesfollowservice.createCategory(productData).subscribe(
            (product: Categoryfollow) => {
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
        this.Categoriesfollowservice.updateCategory(productFormData, this.currentCategoryID).subscribe(
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
                this.currentCategoryID = params.id;
                this.Categoriesfollowservice.getCategory(params.id).subscribe((product) => {
                    this.productForm.name.setValue(product.name);
                    this.productForm.categories.setValue(product.categories.id);
                    this.imageDisplay = product.image;
                    this.productForm.image.setValidators([]);
                    this.productForm.image.updateValueAndValidity();
                });
            }
        });
    }
    onSubmit() {
        // this.isSubmited = true;
        // if (this.form.invalid) return;

        // const productFormData: Categoryfollow = {
        //     id: this.currentCategoryID,
        //     name: this.productForm.name.value,
        //     categories: this.productForm.categories.value,
        //     icon: this.productForm.icon.value,
        //     color: this.productForm.color.value
        // };
        // if (this.editmode) {
        //     this._updateProduct(productFormData);
        // } else {
        //     this._addProduct(productFormData);
        // }
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

    get productForm() {
        return this.form.controls;
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
}
