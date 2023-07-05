import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(usersRoutes), FormsModule, ReactiveFormsModule],
    declarations: [LoginComponent]
})
export class UsersModule {}
