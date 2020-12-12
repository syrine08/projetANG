import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from './product.model';
import {Composition} from './composition.model';
import {CompositionService} from './composition.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService{
  productSelected = new EventEmitter<Product>();
  productChanged = new Subject<void>();
  private product: Product[];
  /* private product: Product[] = [
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
  ]; */
  constructor(private compositionService: CompositionService,
              private http: HttpClient) {
  }
  /*getProduct() {
    return this.product.slice();
  }*/

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  get refreshNeeded$() {
    return this.productChanged;
  }
  getProduct(){
    return this.http.get<any>('http://localhost:3000/product/');
  }
  getProdocByID(id: number){
   //  return this.product.slice()[id];
    return this.http.get('http://localhost:3000/product/' + id);
  }

  toCompositionList(compositions: any[]) {
     this.compositionService.Addcompositions(compositions).subscribe(
       ( response ) => console.log(response)
     );
  }
  addProduct(product: any): Observable<any>{
    const url = 'http://localhost:3000/product/' ;
    return this.http.post<Product>(url, product, this.httpOptions).pipe(
      tap(() =>  {
        this.productChanged.next();
      }))
      ;
  }




  updateProduct(id: any, newProduct: any): Observable<any> {
    const url: string = 'http://localhost:3000/product/' + id;
    return this.http
      .put(url, newProduct)
      .pipe(
        tap(() =>  {
          this.productChanged.next();
        }))
      ;
  }


  /*updateProduct(index: number, newProduct: Product){
    this.product[index] = newProduct;
    this.productChanged.next(this.product.slice());
  }*/
  deleteProduct(id: number){

    return this.http
      .delete('http://localhost:3000/product/' + id)
      .pipe(
        tap(() =>  {
          this.productChanged.next();
        }))
      ;

  }
}
