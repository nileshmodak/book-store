import { Product } from '../models/product.model';
import { reducer } from '../reducers/product.reducer';
import * as ProductAction from '../actions/product.actions';

describe('Product Reducer', () => {
    it('Should add product to the list', () => {
        const initialState: Product[] = [];

        const productAction: ProductAction.AddProduct = {
            type: 'ADD_PRODUCT',
            payload: {
                id: 5,
                name: 'abc',
                price: 25,
                photo: 'abc.jpg',
                rating: 3
            }
        }

        const changeState: Product[] = reducer(initialState, productAction);
        expect(initialState.length).toBeLessThan(changeState.length); 
    });

    it('Should update product to the list', () => {
        const initialState = {
            id: 5,
            name: 'abc',
            price: 25,
            photo: 'abc.jpg',
            rating: 3
        };

        const productAction: ProductAction.UpdateProduct = {
            type: 'UPDATE_PRODUCT',
            payload: {
                id: 5,
                name: 'abc',
                price: 25,
                photo: 'abc.jpg',
                rating: 5
            }
        }

        const changeState: Product[] = reducer([initialState], productAction);
        expect(changeState[0].rating).toEqual(5); 
    });

    it('Should return the default state of product', () => {
        const initialState: Product[] = [];

        const productAction: any = {
            type: 'FAKE',
            payload: {
                id: 5,
                name: 'abc',
                price: 25,
                photo: 'abc.jpg',
                rating: 3
            }
        }

        const changeState: Product[] = reducer(initialState, productAction);
        expect(initialState).toEqual(changeState);
    });
});