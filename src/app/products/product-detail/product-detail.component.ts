import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Composition} from '../../shared/composition.model';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
   product: Product;
   id;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
   this.route.params.subscribe(
     (params: Params) => {
       this.id = this.route.snapshot.params['id'];
       this
      .productService
      .getProdocByID
      (this.route.snapshot.params['id'])
      .subscribe(
        (data: any) => {
          this.product = data;
          console.log(this.product);
        }, error => {

          console.log(error);
          alert('id not found');
        }
      )
    ;
     }
   );
    /*this
      .productService
      .getProdocByID
      (this.route.snapshot.params['id'])
      .subscribe(
        (data: any) => {
          this.product = data;
          console.log(this.product);
        }, error => {

          console.log(error);
          alert('id not found');
        }
      )
    ;*/

  }
  onAddCmp() {
    this.productService.toCompositionList(this.product.compositions);
    this.router.navigate(['/composition-list']);
  }
  onEditProd(){
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    console.log(this.product);
  }
  onDeleteProd(){
    this.productService.deleteProduct(this.id).subscribe();
    this.router.navigate(['/products']);
  }
}
