import { Product } from "./product";

let products = [
  new Product(1, "圖像 Angular 開發入門 第二版", "博碩文化", 500, true, new Date(2024, 3, 10)),
  new Product(2, "金魚都能懂的 CSS 必學屬性", "博碩文化", 500, true, new Date(2024, 3, 10)),
];

//onsole.log(products);
console.table(products);
setProductDisplay(products[0], false);
console.table(products);

function setProductDisplay(product: Product, isShow: boolean) {
  product.isShow = isShow;
}
