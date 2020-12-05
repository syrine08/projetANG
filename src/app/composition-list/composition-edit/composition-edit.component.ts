import {
  Component, OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {CompositionService} from '../../shared/composition.service';
import {NgForm} from '@angular/forms';
import {Composition} from '../../shared/composition.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-composition-edit',
  templateUrl: './composition-edit.component.html'
})
export class CompositionEditComponent implements OnInit , OnDestroy{
  @ViewChild('f') CmpForm: NgForm;
  subscription: Subscription;
  editmode = false;
  editedindex: number;
  editeditem: Composition;
  constructor(private compositionlist: CompositionService) { }

  ngOnInit() {
   this.subscription = this.compositionlist.startedEditing
        .subscribe(
          (index: number) => {
            this.editedindex = index;
            this.editmode = true;
            this.editeditem = this.compositionlist.getComposition(index);
            this.CmpForm.setValue(
              {
                name: this.editeditem.name ,
                amout: this.editeditem.amout
              }
            );
          }
        );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newComposition = new Composition(value.name, value.amout);
    if ( this.editmode)
    {
      this.compositionlist.UpdateComposition(this.editedindex , newComposition);
    }else {
      this.compositionlist.Addcomposition(newComposition);
    }
    this.editmode = false;
    form.reset();
  }
  onClear(){
    this.CmpForm.reset();
    this.editmode = false;
  }
  onDelete(){
    this.compositionlist.DeleteCmp(this.editedindex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
