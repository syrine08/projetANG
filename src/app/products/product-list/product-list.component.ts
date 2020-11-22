import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProduct();
  }



}
