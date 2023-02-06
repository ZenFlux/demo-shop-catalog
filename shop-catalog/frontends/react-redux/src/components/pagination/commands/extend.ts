import ZenCore from "@zenflux/core";

import { IPublicCommandPaginationExtendArgs } from "../model";

export class Extend extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return "Components/Pagination/Controller/Extend";
    }

    apply( args: IPublicCommandPaginationExtendArgs ) {
        const { type, offsetState, maxVisiblePages } = args,
            [ offset, setOffset ] = offsetState;

        switch ( type ) {
        case "next":
            setOffset( offset + maxVisiblePages );
            break;
        case "prev":
            setOffset( offset - maxVisiblePages );
            break;
        }
    }
}
