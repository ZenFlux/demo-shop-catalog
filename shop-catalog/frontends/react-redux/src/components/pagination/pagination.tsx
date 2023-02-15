import React from "react";

import ZenCore from "@zenflux/core";

import { ExtendType, IPaginationProps } from "./model";

import "./pagination.css";

export default function Pagination( props: IPaginationProps ): JSX.Element {
    const isRendered = React.useRef( false );

    const offsetState = React.useState( -1 ),
        [ offset, setOffset ] = offsetState;

    let newOffset = offset;

    const onExtend = ( type: ExtendType ) => {
        ZenCore.managers.commands.run( "Components/Pagination/Controller/Commands/Extend", {
            type,
            setOffset,
            offset: newOffset,
            range: props.maxVisiblePages,
            controller: props.controller,
        } );
    };

    const onChange = ( page: number ) => {
        ZenCore.managers.commands.run( "Components/Pagination/Controller/Commands/Set", {
            page,
            controller: props.controller,
        } );
    };

    // Used to update the offset from `extend` command, when new offset is 0.
    if ( -1 === newOffset ) {
        newOffset = 0;
    }

    // If not rendered yet, means its first render or page change, in this case we need to update the offset.
    if ( ! isRendered.current ) {
        const getOffsetRange = ( offset:number, max:number ) => max * ( offset / max );

        const isOffsetInRange = ( page: number, offset: number, max: number ) =>
            page >= offset && page < ( offset + max );

        const updateOffsetRange = () => {
            if ( 0 === props.currentPage ) {
                return;
            }

            do {
                if ( props.currentPage > newOffset ) {
                    newOffset += props.maxVisiblePages;
                    continue;
                }

                newOffset = 0;

                break;
            } while ( ! isOffsetInRange( props.currentPage, newOffset, props.maxVisiblePages ) );

            newOffset = getOffsetRange( newOffset, props.maxVisiblePages );
        };

        updateOffsetRange();
    }

    isRendered.current = true;

    const pageItems = [],
        visualLimit = props.totalPages > props.maxVisiblePages ? props.maxVisiblePages : props.totalPages;

    let breakFlag = false;

    for ( let i = 0; i < visualLimit; i++ ) {
        const id = newOffset + i;

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

    const shouldExtendNext = ! breakFlag && ( newOffset + props.totalPages ) >= props.maxVisiblePages,
        shouldExtendPrev = newOffset >= props.maxVisiblePages;

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
