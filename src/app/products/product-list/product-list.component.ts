import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../shared/product.model';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit , OnDestroy{
  products: Product[];
  subscription: Subscription;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.productService.productChanged.subscribe(
      () => {
        this.getAllProducts();
      }
    );
    // this.products = this.productService.getProduct();
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getProduct()
      .subscribe(
        (data) => {
          this.products = data;
          console.log(this.products);
        },
        errors => {
          console.log(errors);
          alert(errors.status);
        },
      )
    ;
  }
  onNewProduct(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
