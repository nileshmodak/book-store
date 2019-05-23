import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/product.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { RatingComponent } from './component/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      product: reducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
