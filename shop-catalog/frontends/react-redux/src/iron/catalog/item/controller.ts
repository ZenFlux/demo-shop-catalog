import ZenCore from "@zenflux/core";

import * as commands from './commands/';

export class CatalogItemController extends ZenCore.core.Controller {
    static getName() {
        return 'Catalog/Item/Controller';
    }

    getCommands() {
        return commands;
    }
}

export default CatalogItemController;
