import { inject, Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { map, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductRemoteService extends ProductService {
  private readonly url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);
  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    return this.httpClient.get<Product[]>(this.url).pipe(map((data) => ({ data, count: data.length })));
  }
}
