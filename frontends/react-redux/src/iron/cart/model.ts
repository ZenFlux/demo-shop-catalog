import { ICartItem } from "./item/model";

import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IDataCommandCartAddArgs {
    id: string;
    amount: number;
}

export interface IInternalCommandCartAddArgs {
    id: number;
    name: string;
    price: string;
    amount?: number;
}

export interface IInternalCommandCartRemoveArgs {
    id: number;
}

export interface ICartState {
    loaded: boolean;
    items: ICartItem[];
    total: number;
}

export interface ICartReducers extends SliceCaseReducers<ICartState> {
    setLoaded: CaseReducer<ICartState, PayloadAction<boolean>>;
    setItems: CaseReducer<ICartState, PayloadAction<ICartItem[]>>;
    addItem: CaseReducer<ICartState, PayloadAction<ICartItem>>;
    removeItem: CaseReducer<ICartState, PayloadAction<ICartItem>>;
    updateItem: CaseReducer<ICartState, PayloadAction<ICartItem>>;
    updateTotal: CaseReducer<ICartState, PayloadAction<number>>;
    clearItems: CaseReducer<ICartState>
}
