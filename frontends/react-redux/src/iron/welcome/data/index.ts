import ZenCore from "@zenflux/core";

export { ConfigureDb } from "./configure-db";

export class Index extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Welcome/Data/Index";
    }

    getEndpoint(): string {
        return "welcome/index";
    }
}
