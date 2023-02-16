import ZenCore from "@zenflux/core";

import { ICatalogItem } from "../model";

export class Add extends ZenCore.commandBases.CommandBase {
    static getName() {
        return "Catalog/Item/Commands/Add";
    }

    apply( args: ICatalogItem ) {
        if ( ! args.amount ) {
            args.amount = 1;
        }

        ZenCore.managers.internal.run( "Catalog/Internal/Add", args );
    }
}
