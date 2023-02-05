import ZenCore from "@zenflux/core";

export class Remove extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Cart/Data/Remove";
    }

    getEndpoint() {
        return "cart/remove_item";
    }
}
