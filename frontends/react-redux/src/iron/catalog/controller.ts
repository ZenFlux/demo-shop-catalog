import { Slice } from "@reduxjs/toolkit";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import * as data from "./data/";
import * as internal from "./internal/";

import { ICatalogPaginationData, ICatalogReducers, ICatalogState, IDataCommandCatalogIndexArgs } from "./model";

import { IPublicCommandPaginationSetArgs } from "@internal/components/pagination/model";
import { ICatalogItem } from "@internal/iron/catalog/item/model";

export class CatalogController extends ZenRedux.core.Controller {
    static getName() {
        return "Catalog/Controller";
    }

    setupHooks() {
        const onPageChange = ( args = {} as IPublicCommandPaginationSetArgs ) => {
            if ( this.getState().pagination.current === args.page ) {
                return;
            }

            if ( this === args.controller ) {
                this.getCatalog( args.page );
            }
        };

        ZenCore.managers.commands.onAfter( "Components/Pagination/Controller/Commands/Set", onPageChange.bind( this ) );
    }

    getData() {
        return data;
    }

    getInternal() {
        return internal;
    }

    getSliceInitialState(): ICatalogState {
        return {
            items: [] as ICatalogItem[],
            pagination: {} as ICatalogPaginationData,
            prevPage: 0 as number,
        };
    }

    getReducers(): ICatalogReducers {
        return {
            setPagination: ( state, action ) => {
                state.prevPage = state.pagination.current || 0;
                state.pagination = action.payload;
            },
            setItems( state, action ) {
                state.items = action.payload;
            },
            clearItems( state ) {
                state.items = [];
            }
        };
    }

    getState(): ICatalogState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<any, ICatalogReducers>;
    }

    // TODO Move to file.
    getCatalog( page = 0 ) {
        const promise = ZenCore.managers.data.get( "Catalog/Data/Index", { page } as IDataCommandCatalogIndexArgs );

        promise.then( ( data: any ) => {
            const store = ZenRedux.store.getStore(),
                slice = this.getSlice();

            store.dispatch(
                slice.actions.setItems( data.result )
            );

            store.dispatch(
                slice.actions.setPagination( data.pagination )
            );
        } );
    }
}

export default CatalogController;
