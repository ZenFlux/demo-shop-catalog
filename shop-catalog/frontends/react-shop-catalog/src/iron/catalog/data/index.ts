import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CatalogController from "@internal/iron/catalog/controller";

import { ICatalogItem } from "../model";

export interface IDataCommandIndexArgs {
    page: number;
    query?: {
        id: number
    }
}

export interface IDataCommandOptions {
    local: boolean;
}

export class Index extends ZenCore.commandBases.CommandData {
    static localCatalog: ICatalogItem[] = [];

    static getName() {
        return 'Catalog/Data/Index';
    }

    getEndpoint() {
        return 'catalog/index/{page}';
    }

    apply( args = {} as IDataCommandIndexArgs, options = {} as IDataCommandOptions ) : any {
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
        const args = this.getArgs() as IDataCommandIndexArgs,
            options = this.getOptions() as IDataCommandOptions;

        if ( args.query || options.local ) {
            return;
        }

        const controller = ZenCore.managers.controllers.get( "Catalog/Controller" ) as CatalogController;

        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.clearItems()
        );
    }
}

export { Get } from './get';
