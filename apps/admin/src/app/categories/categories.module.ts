import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './categories.routes';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { CategoryFollowListComponent } from './categoryfollow/category-list/category-list.component';

import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFollowFormComponent } from './categoryfollow/category-form/category-form.component';

@NgModule({
    declarations: [CategoryFollowListComponent, CategoryFollowFormComponent],
    imports: [
        CommonModule,
        CardModule,
        InputSwitchModule,
        InputNumberModule,
        ColorPickerModule,
        ConfirmDialogModule,
        ToastModule,
        InputTextModule,
        ToolbarModule,
        ButtonModule,
        TableModule,
        InputTextareaModule,
        DropdownModule,
        EditorModule,
        TagModule,
        InputMaskModule,
        FieldsetModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CategoriesModule {}
