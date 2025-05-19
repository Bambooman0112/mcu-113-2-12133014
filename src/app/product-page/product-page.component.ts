import { Component, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [ReactiveFormsModule, PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private router = inject(Router);
  private productService = inject(ProductService);

  private destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl<string | undefined>(undefined, { nonNullable: true });

  readonly productName = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)),
    {
      initialValue: undefined,
    }
  );

  readonly pageIndex = signal(1);
  readonly pageSize = signal(5);

  private readonly data = rxResource({
    request: () => ({ name: this.productName(), pageIndex: this.pageIndex(), pageSize: this.pageSize() }),
    defaultValue: { data: [], count: 0 },
    loader: ({ request }) => {
      const { name, pageIndex, pageSize } = request;
      return this.productService.getList(name, pageIndex, pageSize);
    },
  });

  readonly totalCount = computed(() => {
    const { count } = this.data.value();
    return count;
  });

  readonly products = computed(() => {
    const { data } = this.data.value();
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
    this.productService.add(product).subscribe(() => this.data.reload());
  }

  onRemove({ id }: Product): void {
    this.productService.remove(id).subscribe(() => this.pageIndex.set(1));
  }
}
