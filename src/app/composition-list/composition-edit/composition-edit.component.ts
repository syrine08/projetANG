import {
  Component, OnDestroy,
  OnInit, ViewChild
} from '@angular/core';
import {CompositionService} from '../../shared/composition.service';
import {NgForm} from '@angular/forms';
import {Composition} from '../../shared/composition.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-composition-edit',
  templateUrl: './composition-edit.component.html'
})
export class CompositionEditComponent implements OnInit , OnDestroy{
  @ViewChild('f') CmpForm: NgForm;
  subscription: Subscription;
  editmode = false;
  editedindex;
  editeditem: Composition;
  constructor(private route: ActivatedRoute,
              private compositionlist: CompositionService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editedindex = +params['id'];
        this.editmode = params['id'] != null;
      }
    );
    this.subscription = this.compositionlist.startedEditing
        .subscribe(
          () => {
            this.editmode = true;

            this.compositionlist.getComposition(this.editedindex )
              .subscribe((data: any) => {
                  this.editeditem = data;
                  console.log(this.editeditem);
                  this.CmpForm.setValue(
                  {
                    name: this.editeditem.name ,
                    amout: this.editeditem.amout
                  }
                );
                }, error => { console.log(this.route.snapshot.params['id']); console.log(error); alert('id not found'); }
              )
            ;
          }
        );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    let idd: number;
    const newComposition = new Composition(value.id, value.name, value.amout);
    if ( this.editmode)
    {
       this.compositionlist.UpdateComposition(this.editedindex , newComposition).subscribe();
    }else {
      this.compositionlist.Addcomposition(newComposition).subscribe();
    }
    this.editmode = false;
    form.reset();
  }
  onClear(){
    this.CmpForm.reset();
    this.editmode = false;
  }
  onDelete(){
    // this.compositionlist.DeleteCmp(this.editedindex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
