import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CatalogController from "@internal/iron/catalog/controller";

import { IDataCommandCatalogIndexResult } from "../model";

export class Index extends ZenCore.commandBases.CommandData {

    static getName() {
        return "Catalog/Data/Index";
    }

    getEndpoint() {
        return "catalog/index/{page}";
    }

    apply( args = {}, options = {} ): Promise<IDataCommandCatalogIndexResult> {
        const result = super.apply( args, options );

        if ( result.then ) {
            result.then( ( result: IDataCommandCatalogIndexResult ) => {
                // Save current page into memory.
                CatalogController.localCatalog = result.result;
            } );
        }

        return result;
    }

    onBeforeApply() {
        // TODO: Which better this or hook?
        const controller = Index.getController() as CatalogController;

        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.clearItems()
        );
    }
}

export { Get } from "./get";
