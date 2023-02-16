import React, { useEffect } from "react";

import ZenCore from "@zenflux/core";

import WelcomeController from "../controller";

function Error(): JSX.Element {
    const [ error, setError ] = React.useState( {} );

    useEffect( () => {
        if ( ! Object.keys( error ).length ) {

            const controller = ZenCore.managers.controllers.get( "Welcome/Controller" ) as WelcomeController;

            setError( controller.error );
        }
    }, [ error ] );

    return (
        <>
            <h1>Oops!</h1>
            <p style={ { textAlign: "left" } }><b>Error:</b></p>
            <pre className="error">{ JSON.stringify( error, null, 5 ) }</pre>
        </>
    );
}

export default Error;
