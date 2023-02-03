import ZenCore from "@zenflux/core";

export class SetAmount extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return 'Catalog/Item/Commands/SetAmount';
    }

    apply() {
        // Used to be hooked. amount handled via React state, not Redux.
    }
}
