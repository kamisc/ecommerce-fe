import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products'
  
  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId`;

    let params: HttpParams = new HttpParams();
    params = params.append('id', categoryId);

    return this.httpClient.get<GetResponse>(searchUrl, { params: params }).pipe(
      map(resp => resp._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
