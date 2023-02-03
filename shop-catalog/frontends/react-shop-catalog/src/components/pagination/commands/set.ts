import ZenCore from "@zenflux/core";

import { IPublicSetCommandArgs } from "../model";

export class Set extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return 'Components/Pagination/Controller/Set';
    }

    apply( args:IPublicSetCommandArgs ) {
        // Used to be hooked.
    }
}
