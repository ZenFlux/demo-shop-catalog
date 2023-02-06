import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CatalogController from "@internal/iron/catalog/controller";

import { IDataCommandCatalogIndexArgs, IDataCommandCatalogIndexOptions } from "../model";
import { ICatalogItem } from "@internal/iron/catalog/item/model";

export class Index extends ZenCore.commandBases.CommandData {
    static localCatalog: ICatalogItem[] = [];

    static getName() {
        return "Catalog/Data/Index";
    }

    getEndpoint() {
        return "catalog/index/{page}";
    }

    apply( args = {} as IDataCommandCatalogIndexArgs, options = {} as IDataCommandCatalogIndexOptions ): any {
        const { query } = args;

        if ( options.local && Index.localCatalog.length ) {
            if ( query?.id ) {
                return Index.localCatalog.find( ( item ) => item.id === query.id );
            }

            return Index.localCatalog;
        }

        const result = super.apply( args, options );

        if ( result.then ) {
            result.then( ( result: any ) => {
                Index.localCatalog = result.result;
            } );
        }

        return result;
    }

    onBeforeApply() {
        // Should be in the controller, because its bypassing dispatch.
        const args = this.getArgs() as IDataCommandCatalogIndexArgs,
            options = this.getOptions() as IDataCommandCatalogIndexOptions;

        if ( args.query || options.local ) {
            return;
        }

        const controller = ZenCore.managers.controllers.get( "Catalog/Controller" ) as CatalogController;

        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.clearItems()
        );
    }
}

export { Get } from "./get";
