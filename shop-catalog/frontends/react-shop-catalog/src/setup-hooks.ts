import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import { IDataCommandAddArgs } from "./iron/cart/data/add";
import { IItem } from "./iron/cart/item/model";

import CartController from "./iron/cart/controller";

/**
 * This file should contain the hooks that interact between the controllers that does not know about the existence of each other.
 * All other hooks can be in `Controller.setupHooks()` method.
 */
function setupHooks() {
    const cartController = ZenCore.managers.controllers.get( 'Cart/Controller' ) as CartController;

    // On adding item from catalog.
    ZenCore.managers.internal.onAfter( 'Catalog/Internal/Add', ( args: any ) => {
        const item: IDataCommandAddArgs = {
            id: args.id,
            amount: args.amount,
        };

        // Tell server add item to cart.
        ZenCore.managers.data.create( 'Cart/Data/Add', item ).then( () => {
            // Add item to cart.
            ZenCore.managers.internal.run( 'Cart/Internal/Add', args );
        } );

        // Toggle sidebar and show cart.
        ZenCore.managers.commands.run( 'UI/Sidebar/Commands/Toggle' );
    } );

    // On receive catalog.
    ZenCore.managers.data.onAfterOnce( 'Catalog/Data/Index', () => {
        // Request the cart from the server.
        ZenCore.managers.data.get( 'Cart/Data/Index' ).then( async ( cartData: IItem[] ) => {
            const missingItemsIds = [],
                orderedCartData: { [ key: number ]: IItem } = {};

            if ( ! cartData?.length ) {
                return;
            }

            // After we know what in the cart we need add missing data like, name, price, etc... from local catalog.
            for ( const cartItem of cartData ) {
                const catalogItem = await ZenCore.managers.data.get( 'Catalog/Data/Index',
                    { query: { id: cartItem.id } },
                    { local: true } // Data from memory not from the server.
                );

                // Some items in the cart might not be available in local catalog, so we need to request them from the server.
                if ( ! catalogItem ) {
                    missingItemsIds.push( cartItem.id );
                } else {
                    cartItem.name = catalogItem.name;
                    cartItem.price = catalogItem.price;
                }

                orderedCartData[ cartItem.id ] = cartItem;
            }

            // If we have missing items, we need to request them from the server.
            if ( missingItemsIds.length ) {
                const missingItems = await ZenCore.managers.data.get( 'Catalog/Data/Get', {
                    ids: missingItemsIds,
                } );

                // Resolve missing items.
                for ( const missingItem of missingItems ) {
                    const item = orderedCartData[ missingItem.id ];

                    item.name = missingItem.name;
                    item.price = missingItem.price;
                }
            }

            // Update cart items.
            ZenRedux.store.getStore().dispatch(
                cartController.getSlice().actions.setItems( Object.values( orderedCartData ) )
            );

            await ZenCore.managers.internal.run( 'Cart/Internal/UpdateTotal' );
        } );
    } );
}

export default setupHooks;
