import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);

  pageIndex = 1;
  pageSize = 5;
  totalCount = 0;

  products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getProducts();
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
    this.productService.add(product);
    this.getProducts();
  }

  onRemove({ id }: Product): void {
    this.productService.remove(id);
    this.pageIndex = 1;
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getList(undefined, this.pageIndex, this.pageSize).subscribe(({ data, count }) => {
      this.products = data;
      this.totalCount = count;
    });
  }
}
