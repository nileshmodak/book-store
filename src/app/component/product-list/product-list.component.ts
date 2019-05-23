import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { AppState } from '../../app.state';
import { UpdateProduct } from '../../actions/product.actions';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  productList: Observable<Product[]>;
  ratingClicked: number;
  itemIdRatingClicked: string;  
  showLoader: boolean = false;
  intervalID: any;
  productCount: number = 0;
  randomList: any;
  enableRandomRating: boolean = false;
  timeArray = new Array(200, 300, 150, 250, 2000, 3000, 1000, 1500);
  ratingArray = new Array(1,2,3,4,5);

  constructor(private store: Store<AppState>) {
      this.productList = store.select('product').pipe(
        map(list => {
          this.productCount = list && list.length;
          this.randomList = list;
          return list && list.sort(this.compare)
        })
      );
   }

  ngOnInit() {}
  
  ratingComponentClick(updatedRating: Product): void {
   this.updateProductRating(updatedRating);
  }

  updateProductRating(updatedRating) {
    this.showLoader = true;
    const updatedProduct = new UpdateProduct(updatedRating);
    this.store.dispatch(updatedProduct);
    this.showLoader = false;
  }

  compare(a, b) {
    if (a.rating > b.rating){
      return -1;
    }
    if (a.rating < b.rating){
      return 1;
    }
    return 0;
  }

  startRandomRating() {
    
    if(!this.enableRandomRating){
      this.enableRandomRating = true;
    }
    
    //Rate radom Item
    let randomNumber = Math.random();
    let newTime =  this.timeArray[Math.floor(this.timeArray.length * randomNumber)];
    let randomRating = this.ratingArray[Math.floor(this.ratingArray.length * randomNumber)];
    let randomProduct = this.randomList[Math.floor(this.productCount * randomNumber)];

    let payload = {
      id: randomProduct.id,
      rating: randomRating
    }

    this.updateProductRating(payload);

    //Ends here
    clearInterval(this.intervalID);

    this.intervalID = setInterval(() => {
        this.startRandomRating();
    }, newTime);

  }

  stopRandomRating() {
    clearInterval(this.intervalID);
    this.enableRandomRating = false;
  }
}
