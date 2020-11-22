import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {CompositionService} from '../../shared/composition.service';


@Component({
  selector: 'app-composition-edit',
  templateUrl: './composition-edit.component.html'
})
export class CompositionEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  constructor(private compositionlist: CompositionService) { }

  ngOnInit() {
  }

  onAddItem() {

  }

}
