import {EventEmitter, Injectable} from '@angular/core';
import {Product} from './product.model';
import {Composition} from './composition.model';


@Injectable()
export class ProductService{
  productSelected = new EventEmitter<Product>();

  private product: Product[] = [
    new Product('Tasty Schnitzel',
      'A super Tasty Schnitzel',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Composition('Meat', 1),
        new Composition('Frensh Fries', 20)
      ]),
    new Product('Big Fat Burger', 'A super Big Fat Burger',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Composition('buns', 2),
        new Composition(' Meat', 1)
      ])
  ];
  constructor() {
  }
  getProduct() {
    return this.product.slice();
  }
  toShoppingList() {
  }
}
