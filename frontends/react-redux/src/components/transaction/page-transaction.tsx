import React from "react";

import { IPageTransactionProps } from "./model";

import "./page-transaction.css";

export default function PageTransaction( props: IPageTransactionProps ) {
    const [ transition, setTransition ] = React.useState( true ),
        timeout = React.useRef( false );

    if ( ! timeout.current ) {
        timeout.current = true;

        setTimeout( () => {
            setTransition( false );
        }, props.timeout );
    }

    return (
        <div className={ `page-transition ${ transition && "out" }` }>
            { props.children }
        </div>
    );
}
