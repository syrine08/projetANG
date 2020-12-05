import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../../shared/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor() {
  }
  ngOnInit() {
  }

}
