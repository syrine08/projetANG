import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Product} from './product.model';
import {Composition} from './composition.model';
import {CompositionService} from './composition.service';



@Injectable()
export class ProductService{
  productSelected = new EventEmitter<Product>();
  productChanged = new Subject<Product[]>();

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
  constructor(private compositionService: CompositionService) {
  }
  getProduct() {
    return this.product.slice();
  }
  getProdocByID(id: number){
    return this.product.slice()[id];
  }
  toCompositionList(compositions: Composition[]) {
    this.compositionService.Addcompositions(compositions);
  }
  addProduct(product: Product){
    this.product.push(product);
    this.productChanged.next(this.product.slice());
  }
  updateProduct(index: number, newProduct: Product){
    this.product[index] = newProduct;
    this.productChanged.next(this.product.slice());
  }
  deleteProduct(index: number){
    this.product.splice(index, 1);
    this.productChanged.next(this.product.slice());
  }
}
