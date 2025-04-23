import { Component } from '@angular/core';
import { ProductCardListComponent } from './product-card-list/product-card-list.component';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  imports: [ProductCardListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  products!: Product[];

  setEmptyData(): void {
    this.products = [];
  }

  setHasData(): void {
    this.products = [
      new Product({
        id: 1,
        name: '書籍 A',
        authors: ['作者甲', '作者乙', '作者丙'],
        company: '博碩文化',
        isShow: true,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img2',
        createDate: new Date('2025/4/9'),
        price: 10000,
      }),
      new Product({
        id: 2,
        name: '書籍 B',
        authors: ['作者甲', '作者乙', '作者丙'],
        company: '博碩文化',
        isShow: true,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img2',
        createDate: new Date('2025/4/9'),
        price: 10000,
      }),
      new Product({
        id: 3,
        name: '書籍 C',
        authors: ['作者甲', '作者乙', '作者丙'],
        company: '博碩文化',
        isShow: true,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img2',
        createDate: new Date('2025/4/9'),
        price: 10000,
      }),
      new Product({
        id: 4,
        name: '書籍 D',
        authors: ['作者甲', '作者乙', '作者丙'],
        company: '博碩文化',
        isShow: true,
        photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img2',
        createDate: new Date('2025/4/9'),
        price: 10000,
      }),
    ];
  }
}
