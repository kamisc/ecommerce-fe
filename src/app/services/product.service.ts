import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<GetResponse>(`${this.baseUrl}/category/${categoryId}`).pipe(
      map(resp => resp._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
