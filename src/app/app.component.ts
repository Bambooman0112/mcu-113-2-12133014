import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../assets/code/product';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shopping-cart';
}
