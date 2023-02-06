import ZenCore from "@zenflux/core";

export class Add extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Cart/Data/Add";
    }

    getEndpoint() {
        return "cart/add_item";
    }
}
