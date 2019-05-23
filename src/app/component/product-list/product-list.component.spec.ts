import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { RatingComponent } from '../rating/rating.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { UpdateProduct } from '../../actions/product.actions';
import { Product } from '../../models/product.model';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy;
  const initialState: Product[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ProductListComponent,
        RatingComponent
       ],
       providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    dispatchSpy.calls.reset();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('store to be defined', () => { 
    expect(store).toBeDefined();
  });

  it('Product List is there in component', () => {
    expect(component.productList).toBeDefined();
  });

  it('should dispatch an action to UPDATE_PRODUCT', () => {
    let mockData = {
      id: 5,
      name: 'abc',
      price: 25,
      photo: 'abc.jpg',
      rating: 5
    };

    const updatedProduct = new UpdateProduct(mockData);
    component.updateProductRating(mockData);
    expect(store.dispatch).toHaveBeenCalledWith(updatedProduct);
  });

  it('Compare should return 1', () => {
     expect(component.compare({rating:2}, {rating: 3})).toEqual(1);
  });

  it('Compare should return -1', () => {
    expect(component.compare({rating:3}, {rating: 2})).toEqual(-1);
  });

  it('Should clear Interval Id and stop random rating', () => {
    component.intervalID = 123;
    component.enableRandomRating = true;

    component.stopRandomRating();
    expect(component.intervalID).toBeUndefined;
    expect(component.enableRandomRating).toBeFalsy;
  });

});
