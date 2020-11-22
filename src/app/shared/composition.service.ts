import {EventEmitter} from '@angular/core';
import {Composition} from './composition.model';

export class CompositionService {
  compositionChanges = new EventEmitter<Composition[]>();
  private compositions: Composition[] = [
    new Composition('Apples', 5),
    new Composition('Tomatoes', 10),
  ];
  getlist() {
    return this.compositions.slice();
  }
  Addcomposition(composition: Composition) {
    this.compositions.push(composition);
    this.compositionChanges.emit(this.compositions.slice());
  }
  Addcompositions(compositions: Composition[]) {
    this.compositions.push(...compositions);
    this.compositionChanges.emit(this.compositions.slice());
  }

}
