import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export class AddProduct implements Action {
    readonly type = ADD_PRODUCT;

    constructor(public payload: Product) {}
}

export class UpdateProduct implements Action {
    readonly type = UPDATE_PRODUCT;

    constructor(public payload: Product) {}
}

export type Actions = AddProduct | UpdateProduct;