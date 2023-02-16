import React, { useState } from "react";

import ZenCore from "@zenflux/core";

import "./db-connection-setup.css";

const DbConnectionSetup = (): JSX.Element => {
    const [ host, setHost ] = useState( "localhost" );
    const [ port, setPort ] = useState( "3306" );
    const [ username, setUsername ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ database, setDatabase ] = useState( "" );
    const [ skipDBCreation, setSkipDBCreation ] = useState( false );
    const [ message, setMessage ] = useState( "" );

    const handleSubmit = async ( event: React.SyntheticEvent<HTMLFormElement> ) => {
        event.preventDefault();

        // Validate all the fields ain't empty.
        if ( host === "" ) {
            setMessage( "Host cannot be empty" );
            return;
        } else if ( port === "" ) {
            setMessage( "Port cannot be empty" );
            return;
        } else if ( username === "" ) {
            setMessage( "Username cannot be empty" );
            return;
        } else if ( database === "" ) {
            setMessage( "Database cannot be empty" );
            return;
        }

        const promise = ZenCore.managers.data.create( "Welcome/Data/ConfigureDB", {
            host,
            port,
            username,
            password,
            "database_name": database,
            skip_create: skipDBCreation,
        } );

        promise.then( ( response: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            if ( response.success ) {
                setMessage( "Database connection established successfully" );

                return setTimeout( () => globalThis.location.reload(), 2000 );
            }

            setMessage( "Something went wrong." );
        } );

        promise.catch( ( result: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            if ( result.error ) {
                setMessage( result.message );
            } else {
                setMessage( "Unknown error" );
            }
        } );
    };

    return (
        <>
            <form onSubmit={ handleSubmit } className="db-connection-form">
                <h1>Database Connection</h1>
                <div className="form-group">
                    <label htmlFor="host">Host:</label>
                    <input
                        type="text"
                        id="host"
                        value={ host }
                        onChange={ ( event ) => setHost( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="port">Port:</label>
                    <input
                        type="text"
                        id="port"
                        value={ port }
                        onChange={ ( event ) => setPort( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={ username }
                        onChange={ ( event ) => setUsername( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={ password }
                        onChange={ ( event ) => setPassword( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="database">Database:</label>
                    <input
                        type="text"
                        id="database"
                        value={ database }
                        onChange={ ( event ) => setDatabase( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label id="skip_db_creation" htmlFor="skip_db_creation">Skip DB Creation:</label>
                    <input type="checkbox"
                        id="skip_create"
                        checked={ skipDBCreation }
                        onChange={ ( event ) => setSkipDBCreation( event.target.checked ) }
                    />
                </div>
                <button type="submit">Connect</button>
            </form>

            <div className="db-connection-message">
                { message.length > 0 && message }
            </div>
        </>
    );
};

export default DbConnectionSetup;
