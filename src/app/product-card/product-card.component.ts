import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  productName = '書籍 A';
  author = '作者甲、作者乙、作者丙';
  company = '博碩文化';

  isShow = true;
  photoUrl = 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img2';

  onSetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }
}
