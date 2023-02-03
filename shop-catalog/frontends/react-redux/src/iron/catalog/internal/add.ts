import ZenCore from "@zenflux/core";

export class Add extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return 'Catalog/Internal/Add';
    }

    apply( args: any, options: any ) {
       // The command used to be hooked.
    }
}
