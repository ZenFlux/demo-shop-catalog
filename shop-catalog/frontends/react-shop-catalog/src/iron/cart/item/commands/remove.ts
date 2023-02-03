import ZenCore from "@zenflux/core";

export class Remove extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return 'Cart/Item/Commands/Remove';
    }

    apply( args = {} ) {
        // TODO: It should be 'delete'.
        ZenCore.managers.data.create('Cart/Data/Remove', args ).then( () => {
            ZenCore.managers.internal.run( 'Cart/Internal/Remove', args );
        } );
    }
}
