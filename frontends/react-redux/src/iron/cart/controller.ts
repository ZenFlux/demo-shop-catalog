import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import { Slice } from "@reduxjs/toolkit";

import { ICartItem } from "./item/model";
import { ICartReducers, ICartState } from "./model";

import * as data from "./data";
import * as internal from "./internal/";

export class CartController extends ZenRedux.core.Controller {

    static getName() {
        return "Cart/Controller";
    }

    setupHooks() {
        const updateTotal = () => ZenCore.managers.internal.run( "Cart/Internal/UpdateTotal" );

        ZenCore.managers.internal.onAfterUI( "Cart/Internal/Add", updateTotal );
        ZenCore.managers.internal.onAfterUI( "Cart/Internal/Remove", updateTotal );

        // On get cart once, update that the cart is loaded.
        ZenCore.managers.data.onAfterOnce( "Cart/Data/Index", () => {
            ZenRedux.store.getStore().dispatch(
                this.getSlice().actions.setLoaded( true )
            );
        } );

        // Before get cart, clear it.
        ZenCore.managers.data.onBefore( "Cart/Data/Index", () => {
            ZenRedux.store.getStore().dispatch(
                this.getSlice().actions.clearItems()
            );
        } );
    }

    getData() {
        return data;
    }

    getInternal() {
        return internal;
    }

    getSliceInitialState(): ICartState {
        return {
            loaded: false,
            items: [],
            total: 0,
        };
    }

    getReducers(): ICartReducers {
        return {
            setLoaded: ( state, action ) => {
                state.loaded = action.payload;
            },
            setItems: ( state, action ) => {
                state.items = action.payload;
            },
            addItem: ( state, action ) => {
                state.items.push( action.payload );
            },
            removeItem: ( state, action ) => {
                state.items = state.items.filter( ( item ) => item.id !== action.payload.id );
            },
            updateItem: ( state, action ) => {
                const item = state.items.find( ( item: ICartItem ) => item.id === action.payload.id );

                if ( item && item.amount && action.payload.amount ) {
                    item.amount += action.payload.amount;
                } else {
                    throw new Error( "Item not found or amount not set." );
                }
            },
            updateTotal: ( state, action ) => {
                state.total = action.payload;
            },
            clearItems: ( state ) => {
                state.items.length = 0;
            }
        };
    }

    getState(): ICartState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<ICartState, ICartReducers>;
    }
}

export default CartController;
