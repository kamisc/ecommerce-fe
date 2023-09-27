import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products'
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId`;

    let params: HttpParams = new HttpParams();
    params = params
      .append('id', categoryId)
      .append('page', page)
      .append('size', pageSize);

    return this.httpClient.get<GetResponseProducts>(searchUrl, { params: params });
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId`;

    let params: HttpParams = new HttpParams();
    params = params.append('id', categoryId);

    return this.getProducts(searchUrl, params);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining`;

    let params: HttpParams = new HttpParams();
    params = params.append('name', keyword);

    return this.getProducts(searchUrl, params);
  }

  searchProductListPaginate(
    page: number,
    pageSize: number,
    keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining`;

    let params: HttpParams = new HttpParams();
    params = params
      .append('name', keyword)
      .append('page', page)
      .append('size', pageSize);

    return this.httpClient.get<GetResponseProducts>(searchUrl, { params: params });
  }

  private getProducts(searchUrl: string, params: HttpParams): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl, { params: params }).pipe(
      map(resp => resp._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(resp => resp._embedded.productCategory));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
