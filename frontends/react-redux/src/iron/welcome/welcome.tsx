import React from "react";

import ZenRedux from "@zenflux/redux";

import DBConnectionSetup from "./db-connection-setup/db-connection-setup";
import Error from "./error/error";

function getCurrent() {
    const current = ZenRedux.hooks.useCurrentRoute( "Welcome/Controller" );

    switch ( current ) {
    case "Configure":
        return <DBConnectionSetup/>;

    case "Error":
        return <Error/>;

    default:
        return <h1>Ops something went wrong.</h1>;
    }
}

export default function Welcome() {
    return (
        <div className="container">
            { getCurrent() }
        </div>
    );
}
