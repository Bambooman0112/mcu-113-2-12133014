import { Product } from './../models/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    name: new FormControl<String | null>(null),
    authors: new FormArray<FormControl<String | null>>([]),
    company: new FormControl<String | null>(null),
    price: new FormControl<String | null>(null),
  });

  product!: Product;

  get authors(): FormArray<FormControl<String | null>> {
    return this.form.get('authors') as FormArray<FormControl<String | null>>;
  }

  ngOnInit(): void {
    this.route.data.pipe(map(({ product }: Data) => product)).subscribe((product) => (this.product = product));
  }

  onAddAuthor(): void {
    const formControl = new FormControl<string | null>(null);
    this.authors.push(formControl);
  }
}
