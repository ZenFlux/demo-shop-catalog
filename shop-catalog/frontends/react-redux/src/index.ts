import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import { IAPIConfig } from "@zenflux/core/src/interfaces/config";

import { appInit } from "./app-init";
import { setResponseHandlers } from "./response-handlers";

import WelcomeController from "./iron/welcome/controller";

import "./css/index.css";

async function initApp( data: any ) {
    if ( data.success ) {
        const App = ( await import( "./app" ) ).default;

        return appInit( App );
    }

    alert( "Something went wrong" );
}

async function initWelcome( error: any ) {
    const WelcomeComponent = ( await import( "./iron/welcome/welcome" ) ).default;

    const promise = appInit( WelcomeComponent, {
        shouldSetupHooks: false,
        shouldRegisterControllers: false,
    } );

    promise.then( () => {
        switch ( error.code ) {
        case "db_not_configured":
            ZenRedux.managers.routes.to( "Welcome/Controller/Configure" );
            break;

        default:
            if ( error instanceof Error ) {
                error = {
                    message: error.message,
                };
            }

            ZenRedux.managers.routes.to( "Welcome/Controller/Error", { error } );
        }
    } );
}

ZenCore.initialize( {
    baseURL: "http://localhost:8000",
} as IAPIConfig );

ZenRedux.initialize( {} );

setResponseHandlers();

ZenCore.managers.controllers.register( new WelcomeController() );

ZenCore.managers.data.get( "Welcome/Data/Index" )
    .then( initApp )
    .catch( initWelcome );
