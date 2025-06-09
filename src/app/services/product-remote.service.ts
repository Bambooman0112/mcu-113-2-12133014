import { inject, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductRemoteService extends ProductService {
  private readonly url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  override getById(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.get<Product>(url);
  }
  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    let query = { _page: index, _per_page: size } as { name?: string; _page: number; _per_page: number };
    if (name) query = { ...query, name };
    const params = new HttpParams({ fromObject: query });
    return this.httpClient
      .get<{ data: Product[]; items: number }>(this.url, { params })
      .pipe(map(({ data, items: count }) => ({ data, count })));
  }

  override add(product: Readonly<Product>): Observable<Product> {
    return this.httpClient.post<Product>(this.url, { ...product });
  }

  override remove(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.delete<Product>(url);
  }
}
