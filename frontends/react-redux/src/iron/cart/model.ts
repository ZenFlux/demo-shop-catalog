import { IItem } from "./item/model";

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
    items: IItem[];
    total: number;
}

export interface ICartReducers extends SliceCaseReducers<ICartState> {
    setLoaded: CaseReducer<ICartState, PayloadAction<boolean>>;
    setItems: CaseReducer<ICartState, PayloadAction<IItem[]>>;
    addItem: CaseReducer<ICartState, PayloadAction<IItem>>;
    removeItem: CaseReducer<ICartState, PayloadAction<IItem>>;
    updateItem: CaseReducer<ICartState, PayloadAction<IItem>>;
    updateTotal: CaseReducer<ICartState, PayloadAction<number>>;
    clearItems: CaseReducer<ICartState>
}
