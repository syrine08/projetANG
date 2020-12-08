import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id;
  editmode = false;
  productForm: FormGroup;
  productName;
  prdImgpath;
  prdDesc;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private productSrv: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = this.route.snapshot.params['id'];
          this.editmode = params['id'] != null;
          this.initForm();
      }
    );
  }
  private initForm(){
    /*let productName = '';
    let prdImgpath = '';
    let prdDesc = '';*/
    let prdCmps = new FormArray([]);
    console.log( this.id);
    console.log( this.editmode);
    if (this.editmode){
      this.productSrv.getProdocByID(this.id).subscribe((data: any) => {
          const product = data;
          this.productName = product.name;
          this.id = product.id;
          console.log( this.id);
          this.prdImgpath = product.imagePath;
          this.prdDesc = product.description;
          if (product['compositions']){
            for (let comp of product.compositions){
              prdCmps.push(new FormGroup(
                {
                  'id' : new FormControl( '', Validators.required),
                  'name' : new FormControl(comp.name, Validators.required),
                  'amout' : new FormControl(comp.amout,[
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                }
              ));
            }
          }
          this.productForm = new FormGroup({
            'id' : new FormControl(this.id, Validators.required),
            'name' : new FormControl(this.productName, Validators.required),
            'imagePath' : new  FormControl(this.prdImgpath, Validators.required),
            'description' : new FormControl(this.prdDesc, Validators.required),
            'compositions' : prdCmps
          });

        }, error => {
            console.log(error);
            alert('id not found');
          }
        )
      ;

    }
   /* this.productForm = new FormGroup({
      'id' : new FormControl(''),
      'name' : new FormControl(this.productName, Validators.required),
      'imagePath' : new  FormControl(this.prdImgpath, Validators.required),
      'description' : new FormControl(this.prdDesc, Validators.required),
      'compositions' : prdCmps
    });*/
    this.productForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
      compositions: prdCmps
    });


  }
  onSubmit(){
    if (this.editmode) {
      this.productSrv.updateProduct(this.id, this.productForm.value).subscribe();

    } else {
       this.productSrv.addProduct(this.productForm.value).subscribe();
    }
    this.onCancel();
  }
  onAddCmps(){
    ( <FormArray> this.productForm.get('compositions')).push(
      new FormGroup({
        'id' : new FormControl('', Validators.required),
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
