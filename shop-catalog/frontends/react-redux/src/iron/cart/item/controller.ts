import ZenCore from "@zenflux/core";

import * as commands from "./commands/";

export class CartItemController extends ZenCore.core.Controller {
    static getName() {
        return "Cart/Item/Controller";
    }

    getCommands() {
        return commands;
    }
}

export default CartItemController;
