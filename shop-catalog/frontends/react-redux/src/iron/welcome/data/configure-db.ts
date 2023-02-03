import ZenCore from "@zenflux/core";

export class ConfigureDb extends ZenCore.commandBases.CommandData {
    static getName() {
        return 'Welcome/Data/ConfigureDB';
    }

    getEndpoint(): string {
        return 'welcome/setup_database';
    }
}
