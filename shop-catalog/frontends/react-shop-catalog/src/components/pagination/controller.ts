import ZenCore from "@zenflux/core";

import * as commands from './commands';

export class PaginationController extends ZenCore.core.Controller {
    static getName() {
        return 'Components/Pagination/Controller';
    }

    getCommands() {
        return commands;
    }
}

export default PaginationController;
