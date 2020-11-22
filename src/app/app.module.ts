import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductItemComponent} from './products/product-list/product-item/product-item.component';
import {getParseErrors} from '@angular/compiler';
import {ProductService} from './shared/product.service';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {CompositionService} from './shared/composition.service';
import { CompositionListComponent } from './composition-list/composition-list.component';
import {CompositionEditComponent} from './composition-list/composition-edit/composition-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CompositionListComponent,
    CompositionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CompositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
