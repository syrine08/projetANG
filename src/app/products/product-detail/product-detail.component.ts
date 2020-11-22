import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }
  onAddCmp() {
    this.productService.toCompositionList(this.product.compositions);
  }
}
