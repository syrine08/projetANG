import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService ]
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

}
