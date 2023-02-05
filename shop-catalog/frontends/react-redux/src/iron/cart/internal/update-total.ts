import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CartController from "../controller";

export class UpdateTotal extends ZenCore.commandBases.CommandInternal {
    static getName() {
        return "Cart/Internal/UpdateTotal";
    }

    async apply() {
        const controller = ZenCore.managers.controllers.get( "Cart/Controller" ) as CartController,
            { items } = controller.getState();

        let total = 0;

        for ( let i = 0; i !== items.length; ++i ) {
            total += ( items[ i ].amount || 1 ) * parseFloat( items[ i ].price );
        }

        // Update the store.
        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.updateTotal( total )
        );
    }

}

export default UpdateTotal;
