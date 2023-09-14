import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoryfollow } from '../models/categoryfollow';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesfollowService {
    apiURLCategoriesfollow = environment.apiUrl + 'categoriesfollow';
    constructor(private http: HttpClient) {}

    getProductsByCategory(category: string): Observable<Categoryfollow[]> {
        const params = { categories: category };
        return this.http.get<Categoryfollow[]>(this.apiURLCategoriesfollow, { params });
    }
    getCategoriesfollow(): Observable<Categoryfollow[]> {
        return this.http.get<Categoryfollow[]>(this.apiURLCategoriesfollow);
    }

    getCategory(categoryId: string): Observable<Categoryfollow> {
        return this.http.get<Categoryfollow>(`${this.apiURLCategoriesfollow}/${categoryId}`);
    }

    createCategory(productData: FormData): Observable<Categoryfollow> {
        return this.http.post<Categoryfollow>(this.apiURLCategoriesfollow, productData);
    }

    updateCategory(productData: FormData, productId: string): Observable<Categoryfollow> {
        return this.http.put<Categoryfollow>(`${this.apiURLCategoriesfollow}/${productId}`, productData);
    }

    deleteCategory(productId: string): Observable<object> {
        return this.http.delete<object>(`${this.apiURLCategoriesfollow}/${productId}`);
    }
}
