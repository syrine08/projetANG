import { Component, OnInit } from '@angular/core';
import {Composition} from '../shared/composition.model';
import {CompositionService} from '../shared/composition.service';

@Component({
  selector: 'app-composition-list',
  templateUrl: './composition-list.component.html',
  styleUrls: ['./composition-list.component.css']
})
export class CompositionListComponent implements OnInit {
  compositions: Composition[];
  constructor(private compositionlist: CompositionService) { }

  ngOnInit(): void {
    this.compositions = this.compositionlist.getlist();
    this.compositionlist.compositionChanges.subscribe(
      (compositions: Composition[]) => {
        this.compositions = compositions;
      }
    );
  }

}
