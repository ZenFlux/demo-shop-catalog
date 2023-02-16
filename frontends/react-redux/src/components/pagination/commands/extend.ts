import ZenCore from "@zenflux/core";

import { IPublicCommandPaginationExtendArgs } from "../model";

export class Extend extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return "Components/Pagination/Controller/Commands/Extend";
    }

    apply( args: IPublicCommandPaginationExtendArgs ) {
        const { type, range, offset, setOffset } = args;

        switch ( type ) {
        case "next":
            setOffset( offset + range );
            break;
        case "prev":
            setOffset( offset - range );
            break;
        }
    }
}
