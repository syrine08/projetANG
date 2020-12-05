import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id: number;
  editmode = false;
  productForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private productSrv: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.editmode = params['id'] != null;
          this.initForm();
      }
    );
  }
  private initForm(){
    let productName = '';
    let prdImgpath = '';
    let prdDesc = '';
    let prdCmps = new FormArray([]);

    if (this.editmode){
      const product = this.productSrv.getProdocByID(this.id);
      productName = product.name;
      prdImgpath = product.imagePath;
      prdDesc = product.description;
      if (product['compositions']){
        for (let comp of product.compositions){
          prdCmps.push(new FormGroup(
            {
              'name' : new FormControl(comp.name, Validators.required),
              'amout' : new FormControl(comp.amout,[
                 Validators.required,
                 Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }
          ));
        }
      }
    }
    this.productForm = new FormGroup({
      'name' : new FormControl(productName, Validators.required),
      'imagePath' : new  FormControl(prdImgpath, Validators.required),
      'description' : new FormControl(prdDesc, Validators.required),
      'compositions' : prdCmps
    });
  }
  onSubmit(){
    if (this.editmode) {
      this.productSrv.updateProduct(this.id, this.productForm.value);
    } else {
      this.productSrv.addProduct(this.productForm.value);
    }
    this.onCancel();
  }
  onAddCmps(){
    ( <FormArray> this.productForm.get('compositions')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amout' : new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteCmp(index: number){
    ( <FormArray> this.productForm.get('compositions')).removeAt(index);
  }
}
