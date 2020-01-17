import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, VirtualTimeScheduler } from 'rxjs';
import { catchError, tap, filter, find, map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable(
    { providedIn: 'root' }
)
export class ProductService {
    private url = 'api/products/products.json';
    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.url).pipe(
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return throwError(err.message);
    }
}
