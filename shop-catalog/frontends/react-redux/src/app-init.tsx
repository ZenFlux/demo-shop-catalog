import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import setupHooks from "./setup-hooks";

import { defaultAppArgs, IAppArgs } from "./app-model";

export const appInit = async ( App: () => JSX.Element, args: IAppArgs = defaultAppArgs ) => {

    if ( args.shouldRegisterControllers ) {
        Object.values( await import( "./controllers") ).forEach(
            ( controller ) => ZenCore.managers.controllers.register( new controller() )
        );
    }

    if ( args.shouldSetupHooks ) {
        setupHooks();
    }

    const store = ZenRedux.store.initStore(),
        root = ReactDOM.createRoot(
            document.getElementById( "root" ) as HTMLElement
        );

    root.render(
        <Provider store={ store }>
            <App/>
        </Provider>
    );
};

export default appInit;
