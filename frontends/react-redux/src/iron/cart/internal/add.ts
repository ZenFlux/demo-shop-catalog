import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CartController from "../controller";

import { ICartItem } from "../item/model";
import { IInternalCommandCartAddArgs } from "../model";

export class Add extends ZenCore.commandBases.CommandInternal {
    static getName() {
        return "Cart/Internal/Add";
    }

    async apply( args: IInternalCommandCartAddArgs ) {
        args = Object.assign( {}, args );

        const controller = ZenCore.managers.controllers.get( "Cart/Controller" ) as CartController,
            { items } = controller.getState(),
            item = items.find( ( item: ICartItem ) => item.id === args.id ),
            slice = controller.getSlice(),
            store = ZenRedux.store.getStore();

        if ( ! args.amount ) {
            args.amount = 1;
        }

        // Add or update item in cart.
        item ?
            store.dispatch( slice.actions.updateItem( args ) ) :
            store.dispatch( slice.actions.addItem( args ) );
    }

}

export default Add;
