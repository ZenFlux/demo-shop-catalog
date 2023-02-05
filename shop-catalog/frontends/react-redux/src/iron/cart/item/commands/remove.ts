import ZenCore from "@zenflux/core";

export class Remove extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return "Cart/Item/Commands/Remove";
    }

    apply( args = {} ) {
        ZenCore.managers.data.delete( "Cart/Data/Remove", args ).then( () => {
            ZenCore.managers.internal.run( "Cart/Internal/Remove", args );
        } );
    }
}
