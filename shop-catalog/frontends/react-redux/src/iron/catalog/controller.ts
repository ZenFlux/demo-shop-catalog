import { PayloadAction, Slice } from "@reduxjs/toolkit";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import * as data from './data/';
import * as internal from './internal/';

import { ICatalogState, ICatalogReducers, IPaginationData, ICatalogItem } from "./model";

import { IDataCommandIndexArgs } from "./data/";
import { IPublicSetCommandArgs } from "@internal/components/pagination/model";

export class CatalogController extends ZenRedux.core.Controller {
    static getName() {
        return 'Catalog/Controller';
    }

    setupHooks() {
        const onPageChange = ( args = {} as IPublicSetCommandArgs ) => {
            if( this.getState().pagination.current === args.page ) {
                return;
            }

            if( this === args.controller ) {
                this.getCatalog( args.page );
            }
        };

        ZenCore.managers.commands.onAfter( 'Components/Pagination/Controller/Set', onPageChange.bind( this ) );
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
            pagination: {} as IPaginationData,
            prevPage: 0 as number,
        }
    }

    getReducers(): ICatalogReducers {
        return {
            setPagination: ( state, action ) => {
                state.prevPage = state.pagination.current || 0;
                state.pagination = action.payload;
            },
            setItems( state: ICatalogState, action: PayloadAction<ICatalogItem[]> ) {
                state.items = action.payload;
            },
            clearItems( state: ICatalogState ) {
                state.items = [];
            }
        }
    }

    getState(): ICatalogState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<any, ICatalogReducers>
    }

    // TODO Move to file.
    getCatalog(page: number = 0 ) {
        const promise = ZenCore.managers.data.get( 'Catalog/Data/Index', { page } as IDataCommandIndexArgs );

        promise.then( ( data: any ) => {
            const store = ZenRedux.store.getStore(),
                slice = this.getSlice();

            store.dispatch(
                slice.actions.setItems( data.result )
            );

            store.dispatch(
                slice.actions.setPagination( data.pagination )
            )
        } );
    }
}

export default CatalogController;
