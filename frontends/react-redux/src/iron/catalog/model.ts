import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { ICatalogItem } from "./item/model";

export interface IDataCommandCatalogIndexArgs {
    page: number;
    query?: {
        id: number
    }
}

export interface IDataCommandCatalogIndexOptions {
    local: boolean;
}

export interface ICatalogState {
    items: ICatalogItem[];
    pagination: ICatalogPaginationData;
    prevPage: number;
}

export interface ICatalogPaginationData {
    current: number;
    pages: number;
    perPage: number,
    total: number,
}

export interface ICatalogReducers extends SliceCaseReducers<ICatalogState> {
    setPagination: CaseReducer<ICatalogState, PayloadAction<ICatalogPaginationData>>
    setItems: CaseReducer<ICatalogState, PayloadAction<ICatalogItem[]>>;
    clearItems: CaseReducer<ICatalogState>;
}
