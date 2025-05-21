import { Product } from './../models/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss',
})
export class ProductFormPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  form = new FormGroup({
    id: new FormControl<String | null>(null),
    name: new FormControl<String | null>(null, { validators: [Validators.required] }),
    authors: new FormArray<FormControl<String | null>>([]),
    company: new FormControl<String | null>(null, { validators: [Validators.required] }),
    price: new FormControl<String | null>(null, { validators: [Validators.required] }),
  });

  product!: Product;

  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get authors(): FormArray<FormControl<String | null>> {
    return this.form.get('authors') as FormArray<FormControl<String | null>>;
  }

  get company(): FormControl<string | null> {
    return this.form.get('company') as FormControl<string | null>;
  }
  get price(): FormControl<string | null> {
    return this.form.get('price') as FormControl<string | null>;
  }

  ngOnInit(): void {
    this.route.data.pipe(map(({ product }: Data) => product)).subscribe((product) => (this.product = product));
  }

  onAddAuthor(): void {
    const formControl = new FormControl<string | null>(null, { validators: [Validators.required] });
    this.authors.push(formControl);
  }
}
