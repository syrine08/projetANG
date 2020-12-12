import {EventEmitter, Injectable} from '@angular/core';
import {Composition} from './composition.model';
import {forkJoin, Observable, Subject} from 'rxjs';
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
    return this.http.post<Composition>(url, composition, this.httpOptions)
      .pipe(
      tap(() =>  {
         this.CmpsChanged.next();
      }))
      ;
  }
  Addcompositions(compositions: any[]): Observable<any>{
    const url = 'http://localhost:3000/Compositions/' ;
    let list = [];
    for (let i = 0 ; i < compositions.length ; i++){
      list.push(this.http.post(url, compositions[i]));
    }
    return forkJoin(list);
  }
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
  search(q: string, a: number): Observable<any> {

    return this.http.get(
      'http://localhost:3000/' + 'compositions?name_like=' + q + '&amout_like=' + a
    );
  }
  DeleteCmp(id: number){
    return this.http
      .delete('http://localhost:3000/Compositions/' + id)
      .pipe(
        tap(() =>  {
          this.CmpsChanged.next();
        }))
      ;
  }
}
