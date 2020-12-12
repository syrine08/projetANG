import {Component, OnDestroy, OnInit} from '@angular/core';
import {Composition} from '../shared/composition.model';
import {CompositionService} from '../shared/composition.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-composition-list',
  templateUrl: './composition-list.component.html',
  styleUrls: ['./composition-list.component.css']
})
export class CompositionListComponent implements OnInit , OnDestroy{
  compositions: Composition[];
  subscription: Subscription;
  searchvalue: string;
  p: number = 1;
  constructor(private compositionlist: CompositionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.compositions = this.compositionlist.getlist();
    /*this.compositionlist.compositionChanges.subscribe(
      () => {
        this.getAllCmps();
      }
    );*/
    this.subscription = this.compositionlist.CmpsChanged.subscribe(
      () => {
        this.getAllCmps();
      }
    );
    this.getAllCmps();
  }

  getAllCmps(){
    this.compositionlist.getlist()
      .subscribe(
        (data) => {
          this.compositions = data;
        },
        errors => {
          console.log(errors);
          alert(errors.status);
        },
      )
    ;
  }
  onEditItem(id: number){
   // this.compositionlist.startedEditing.next(id);
    console.log(id);
    this.router.navigate([ id, 'edit'], {relativeTo: this.route});
  }
  /*
  onsearch(){
    this.compositionlist.search(this.searchvalue).subscribe(
      (data) => {
        if ( this.searchvalue != null) {
            this.compositions = data;
        }
      }
    );
  }*/
  onsearchh(form: NgForm){
    const value = form.value;
    this.compositionlist.search(value.name, value.amount).subscribe(
      (data) => {
        if ( value.name != null) {
          this.compositions = data;
        }
      }
    );
  }
  annuler(){
    this.getAllCmps();
  }
  onDelete(id: number){
     this.compositionlist.DeleteCmp(id).subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
