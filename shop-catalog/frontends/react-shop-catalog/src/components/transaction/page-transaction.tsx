import React from "react";

import "./page-transaction.css";

export interface IPageTransactionProps {
    timeout: number;
    children: React.ReactNode;
}

export default function PageTransaction( props: IPageTransactionProps ) {
    const [ transition, setTransition ] = React.useState( true );

    React.useEffect( () => {
        setTransition( true );

        const timeout = setTimeout( () => {
            setTransition( false );
        }, props.timeout );

        return () => clearTimeout( timeout );
    }, [ props.children, props.timeout ] );

    return (
        <div className={`page-transition ${ transition && 'out' }`}>
            { props.children }
        </div>
    );
}
