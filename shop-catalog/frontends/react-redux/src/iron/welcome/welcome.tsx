import React, { useEffect } from "react";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import DBConnectionSetup from "./db-connection-setup/db-connection-setup";

import WelcomeController from "@internal/iron/welcome/controller";

function Error(): JSX.Element {
    const [ error, setError ] = React.useState( {} );

    useEffect( () => {
        if ( ! Object.keys( error ).length ) {

            const controller = ZenCore.managers.controllers.get( 'Welcome/Controller' ) as WelcomeController;

            setError( controller.error )
        }
    }, [ error ] );

    return (
        <>
            <h1>Oops!</h1>
            <p style={{textAlign: "left"}}><b>Error:</b></p>
            <pre className="error">{ JSON.stringify( error, null, 5) }</pre>
        </>
    );
}

function getCurrent() {
    const current = ZenRedux.hooks.useCurrentRoute( 'Welcome/Controller' );

    switch ( current ) {
        case 'Configure':
            return <DBConnectionSetup/>;

        case 'Error':
            return <Error/>;

        default:
            return <h1>Welcome</h1>
    }
}

export default function Welcome() {
    return (
        <div className="container">
            { getCurrent() }
        </div>
    );
}
