import { ProductService } from './../services/product.service';
import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { inject } from '@angular/core';

export const productResolver: ResolveFn<Product> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id')!;
  return productService.getById(+id);
};
