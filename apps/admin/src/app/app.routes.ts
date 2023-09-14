import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashbroadComponent } from './pages/dashbroad/dashbroad.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { AuthGuard } from '@bluebits/users';
import { CategoryFollowFormComponent } from './categories/categoryfollow/category-form/category-form.component';
import { CategoryFollowListComponent } from './categories/categoryfollow/category-list/category-list.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashbroad',
                pathMatch: 'full'
            },
            {
                path: 'dashbroad',
                component: DashbroadComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
                // loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule)
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            },
            {
                path: 'orders',
                component: OrdersListComponent
            },
            {
                path: 'orders/:id',
                component: OrdersDetailComponent
            },
            {
                path: 'categoryfollow',
                component: CategoryFollowListComponent
            },

            {
                path: 'categoryfollow/form',
                component: CategoryFollowFormComponent
            },
            {
                path: 'categoryfollow/form/:id',
                component: CategoryFollowFormComponent
            }
        ]
    }
];
