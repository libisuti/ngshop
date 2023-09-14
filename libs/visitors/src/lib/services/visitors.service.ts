import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../models/visit';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class VisitorService {
    apiURLVisitors = environment.apiUrl + 'visitors';
    constructor(private http: HttpClient) {}
    // increaseVisitorCount(visit: Visit): Observable<Visit> {
    //     return this.http.post<Visit>('http://localhost:3000/api/v1/visitors/day', visit);
    // }

    GetVisitorCount(): Observable<any> {
        return this.http.get(`http://localhost:3000/api/v1/visitors/day`);
    }
    GetVisitor(): Observable<any> {
        return this.http.get(`http://localhost:3000/api/v1/visitors`);
    }
}
