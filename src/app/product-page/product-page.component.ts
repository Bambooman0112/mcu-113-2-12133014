import { Component, Inject, inject, OnInit, computed } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { BehaviorSubject, combineLatest, count, startWith, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  private readonly pageIndex$ = new BehaviorSubject(1);
  get pageIndex() {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }

  private readonly refresh$ = new Subject<void>();

  pageSize = 5;
  private readonly data$ = combineLatest([
    this.pageIndex$.pipe(tap((value) => console.log('page index', value))),
    this.refresh$.pipe(
      startWith(undefined),
      tap(() => console.log('refresh'))
    ),
  ]).pipe(switchMap(() => this.productService.getList(undefined, this.pageIndex, this.pageSize)));

  private readonly data = toSignal(this.data$, { initialValue: { data: [], count: 0 } });

  readonly totalCount = computed(() => {
    const { count } = this.data();
    return count;
  });

  readonly products = computed(() => {
    const { data } = this.data();
    return data;
  });

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  onAdd(): void {
    const product = new Product({
      name: '書籍 Z',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '博碩文化',
      isShow: true,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date('2025/4/9'),
      price: 10000,
    });
    this.productService.add(product).subscribe(() => this.refresh$.next());
  }

  onRemove({ id }: Product): void {
    this.productService.remove(id).subscribe(() => {
      this.pageIndex = 1;
    });
  }
}
