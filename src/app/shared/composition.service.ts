import {EventEmitter} from '@angular/core';
import {Composition} from './composition.model';
import {Subject} from 'rxjs';

export class CompositionService {
  compositionChanges = new EventEmitter<Composition[]>();
  startedEditing = new Subject<number>();
  private compositions: Composition[] = [
    new Composition('Apples', 5),
    new Composition('Tomatoes', 10),
  ];
  getlist() {
    return this.compositions.slice();
  }
  getComposition(index: number){
    return this.compositions[index];
  }
  Addcomposition(composition: Composition) {
    this.compositions.push(composition);
    this.compositionChanges.emit(this.compositions.slice());
  }
  Addcompositions(compositions: Composition[]) {
    this.compositions.push(...compositions);
    this.compositionChanges.emit(this.compositions.slice());
  }
  UpdateComposition(index: number, newCmp: Composition){
    this.compositions[index] = newCmp;
    this.compositionChanges.next(this.compositions.slice());
  }
  DeleteCmp(index: number){
    this.compositions.splice(index, 1);
    this.compositionChanges.next(this.compositions.slice());

  }
}
