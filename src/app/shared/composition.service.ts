import {EventEmitter, Injectable} from '@angular/core';
import {Composition} from './composition.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './product.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {
  compositionChanges = new EventEmitter<void>();
  startedEditing = new Subject<void>();
  CmpsChanged = new Subject<void>();
  /*private compositions: Composition[] = [
    new Composition(3,  'Apples',  5),
    new Composition(4, 'Tomatoes', 10),
  ];*/
  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  get refreshNeeded$() {
    return this.CmpsChanged;
  }
  getlist() {
    return this.http.get<any>('http://localhost:3000/Compositions/');
  }
  getComposition(id: number){
    return this.http.get('http://localhost:3000/Compositions/' + id);
  }
  Addcomposition(composition: any): Observable<any>{
    const url = 'http://localhost:3000/Compositions/' ;
    return this.http.post<Product>(url, composition, this.httpOptions)
      .pipe(
      tap(() =>  {
         this.CmpsChanged.next();
      }))
      ;
  }
  /*
  Addcompositions(compositions: Composition[]) {
    this.compositions.push(...compositions);
    this.compositionChanges.emit(this.compositions.slice());
  }*/
  UpdateComposition(id: any, newCmp: any){
    const url: string = 'http://localhost:3000/Compositions/' + id;
    return this.http
      .put(url, newCmp)
      .pipe(
        tap(() =>  {
          this.CmpsChanged.next();
        }))
      ;
  }
  /*
  DeleteCmp(index: number){
    this.compositions.splice(index, 1);
    this.compositionChanges.next(this.compositions.slice());

  }*/
}
