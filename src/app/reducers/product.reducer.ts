import { Product } from '../models/product.model';
import * as ProductAction from '../actions/product.actions';
import SampleData from '../data.json';

const initialState: Product[] = SampleData;
export function reducer(state: Product[] = initialState, action: ProductAction.Actions) {

    switch(action.type) {
        case ProductAction.ADD_PRODUCT:
            return [...state, action.payload];
        case ProductAction.UPDATE_PRODUCT:
            return state.map(item => item.id === action.payload.id ? {...item, 'rating': action.payload.rating}: item);   
        default:
            return state;
    }
}