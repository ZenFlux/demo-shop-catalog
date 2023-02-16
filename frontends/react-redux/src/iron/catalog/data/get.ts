import ZenCore from "@zenflux/core";

export class Get extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Catalog/Data/Get";
    }

    getEndpoint() {
        return "catalog/get/{ids}";
    }
}
