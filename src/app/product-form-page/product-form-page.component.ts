import { Product } from './../models/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
})
export class ProductFormPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  form = new FormGroup({
    id: new FormControl<String | null>(null),
    name: new FormControl<String | null>(null, { validators: [Validators.required] }),
    authors: new FormArray<FormControl<String | null>>([]),
    company: new FormControl<String | null>(null, { validators: [Validators.required] }),
    price: new FormControl<String | null>(null, { validators: [Validators.required] }),
    isShow: new FormControl<boolean>(true, { nonNullable: true }),
  });

  product!: Product;

  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get authors(): FormArray<FormControl<string | null>> {
    return this.form.get('authors') as FormArray<FormControl<string | null>>;
  }

  get company(): FormControl<string | null> {
    return this.form.get('company') as FormControl<string | null>;
  }
  get price(): FormControl<string | null> {
    return this.form.get('price') as FormControl<string | null>;
  }
  get isShow(): FormControl<boolean> {
    return this.form.get('isShow') as FormControl<boolean>;
  }

  ngOnInit(): void {
    this.route.data.pipe(map(({ product }: Data) => product)).subscribe((product) => (this.product = product));
  }

  onAddAuthor(): void {
    const formControl = new FormControl<string | null>(null, { validators: [Validators.required] });
    this.authors.push(formControl);
  }

  onCancel(): void {
    this.router.navigate(['porducts']);
  }

  onSave(): void {
    const formData = new Product({
      name: this.name.value!,
      authors: this.authors.value.map((author) => author!),
      company: this.company.value!,
      isShow: this.isShow.value,
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      createDate: new Date(),
      price: +(this.price.value || '0'),
    });
    this.productService.add(formData).subscribe(() => this.router.navigate(['products']));
  }
}
