import ZenCore from "@zenflux/core";

import { IPublicCommandPaginationSetArgs } from "../model";

export class Set extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return "Components/Pagination/Controller/Set";
    }

    apply( args: IPublicCommandPaginationSetArgs ) { // eslint-disable-line @typescript-eslint/no-unused-vars
        // Used to be hooked.
    }
}
