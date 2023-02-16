import ZenCore from "@zenflux/core";

export { Add } from "./add";

export class Index extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Cart/Data/Index";
    }

    getEndpoint() {
        return "cart/index";
    }
}

export { Remove } from "./remove";
