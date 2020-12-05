import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
   product: Product;
   id: number;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
   this.route.params.subscribe(
     (params: Params) => {
       this.id = +params['id'];
       this.product = this.productService.getProdocByID(this.id);
     }
   );
  }
  onAddCmp() {
    this.productService.toCompositionList(this.product.compositions);
  }
  onEditProd(){
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  onDeleteProd(){
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }
}
