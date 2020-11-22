import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionListComponent } from './composition-list.component';

describe('CompositionListComponent', () => {
  let component: CompositionListComponent;
  let fixture: ComponentFixture<CompositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
