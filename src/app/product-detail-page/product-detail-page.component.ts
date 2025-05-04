import { Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  id = input.required<number, string | number>({ transform: numberAttribute });
  product!: Product;

  readonly router = inject(Router);

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.product = this.productService.getById(this.id());
  }

  onEdit(): void {
    this.router.navigate(['product', 'form', this.product.id]);
  }

  onRemove(): void {
    this.productService.remove(this.product.id);
    this.router.navigate(['products']);
  }

  onBack(): void {
    this.router.navigate(['products']);
  }
}
