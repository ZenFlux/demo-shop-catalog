import React from "react";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import { ExtendType, IPaginationProps } from "./model";

import "./pagination.css";

export default function Pagination( props: IPaginationProps ): JSX.Element {
    const offsetState = React.useState( 0 ),
        [ offset, setOffset ] = offsetState;

    const prevOffset = ZenRedux.hooks.usePrevious( offset );

    const onExtend = ( type: ExtendType ) => {
        ZenCore.managers.commands.run( "Components/Pagination/Controller/Extend", {
            type,
            offsetState,
            maxVisiblePages: props.maxVisiblePages,
            controller: props.controller,
        } );
    };

    const onChange = ( page: number ) => {
        ZenCore.managers.commands.run( "Components/Pagination/Controller/Set", {
            page,
            controller: props.controller,
        } );
    };

    const inRange = function ( active: number, min: number, max: number ) {
        return ( active >= min && active < max );
    };

    const updateExtendOffset = () => {
        // TODO: Should be a better way, prevOffset not the best practice.
        if ( prevOffset !== undefined && offset !== prevOffset ) {
            return;
        }

        let offsetRange = offset;

        do {
            if ( props.currentPage === offsetRange ) {
                return;
            }

            if ( ! props.currentPage ) {
                offsetRange = 0;
            } else if ( props.currentPage > offsetRange ) {
                offsetRange += props.maxVisiblePages;
            } else {
                offsetRange -= props.maxVisiblePages;
            }

        } while ( ! inRange( props.currentPage, offsetRange, offsetRange + props.maxVisiblePages ) );

        if ( prevOffset !== offsetRange ) {
            setOffset( offsetRange );
        }
    };

    // TODO: Check other hooks compatibility to here.
    React.useEffect( () => updateExtendOffset(), [ offset, updateExtendOffset ] );

    const pageItems = [],
        visualLimit = props.totalPages > props.maxVisiblePages ? props.maxVisiblePages : props.totalPages;

    let breakFlag = false;

    for ( let i = 0; i < visualLimit; i++ ) {
        const id = offset + i;

        if ( id > ( props.totalPages - 1 ) ) {
            breakFlag = true;
            break;
        }

        pageItems.push(
            <li key={ id } className={ `page-item ${ props.currentPage === id ? "active" : "" }` }>
                <button className="page-link" onClick={ () => onChange( id ) }>{ id + 1 }</button>
            </li>
        );
    }

    const shouldExtendNext = ! breakFlag && ( offset + props.totalPages ) >= props.maxVisiblePages,
        shouldExtendPrev = offset >= props.maxVisiblePages;

    const prev = <li className="page-item">
        <button disabled={ props.currentPage === 0 } className="page-link"
            onClick={ () => onChange( props.currentPage - 1 ) }>«
        </button>
    </li>;

    const prevExtend = shouldExtendPrev ?
        <li className="page-item">
            <button className="page-link" onClick={ () => onExtend( "prev" ) }>←</button>
        </li> : null;

    const next = shouldExtendNext ? <li className="page-item">
        <button className="page-link" onClick={ () => onExtend( "next" ) }>→</button>
    </li> : null;

    const nextExtend = <li className="page-item">
        <button disabled={ props.currentPage + 1 >= props.totalPages }
            className="page-link" onClick={ () => onChange( props.currentPage + 1 ) }>»
        </button>
    </li>;

    return (
        <div className={ "pagination" }>
            { prev }
            { prevExtend }
            { pageItems }
            { next }
            { nextExtend }
        </div>
    );
}
