import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface ICatalogItemProps extends ICatalogItem {
    key: string;
}

export interface ICatalogItem {
    id: number;
    name?: string;
    price?: number;
    amount?: number;
}

export interface ICatalogState {
    items: ICatalogItem[];
    pagination: IPaginationData;
    prevPage: number;
}

export interface IPaginationData { // TODO: move to @internal/components/pagination/model
    current: number;
    pages: number;
    perPage: number,
    total: number,
}

export interface ICatalogReducers extends SliceCaseReducers<ICatalogState> {
    setPagination: CaseReducer<ICatalogState, PayloadAction<IPaginationData>>
    setItems: CaseReducer<ICatalogState, PayloadAction<ICatalogItem[]>>;
    clearItems: CaseReducer<ICatalogState>;
}
