import { booleanAttribute, Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true, transform: numberAttribute })
  id!: number;
  @Input()
  productName?: string;
  @Input()
  author!: string;
  @Input()
  company!: string;
  @Input({ transform: booleanAttribute })
  isShow!: boolean;
  @Input()
  photoUrl!: string;

  onSetDisplay(isShow: boolean): void {
    this.isShow = isShow;
  }
}
