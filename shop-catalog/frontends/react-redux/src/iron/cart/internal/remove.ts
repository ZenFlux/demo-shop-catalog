import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CartController from "../controller";

import { IItem } from "../item/model";
import { IInternalCommandCartRemoveArgs } from "../model";

export class Remove extends ZenCore.commandBases.CommandInternal {
    static getName() {
        return "Cart/Internal/Remove";
    }

    async apply( args: IInternalCommandCartRemoveArgs ) {
        const controller = ZenCore.managers.controllers.get( "Cart/Controller" ) as CartController,
            { items } = controller.getState(),
            item = items.find( ( item: IItem ) => item.id === args.id );

        if ( item ) {
            ZenRedux.store.getStore().dispatch(
                controller.getSlice().actions.removeItem( item )
            );
        } else {
            throw new Error( "Item not found" ); // TODO: class for error class.
        }
    }

}

export default Remove;
