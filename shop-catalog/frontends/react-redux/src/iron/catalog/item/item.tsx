import React, { ChangeEvent } from "react";

import ZenCore from "@zenflux/core";

import { ICatalogItemProps } from "./model";

import "./item.css";

import config from "@internal/config";

/**
 * setAmount in state here for not causing re-rendering of the whole catalog.
 */
function ItemComponent( data: ICatalogItemProps ): JSX.Element {
    const { id, name, price } = data,
        imageURL = config.baseURL + `/catalog/get_product_image/${ id }`;// TODO this line is repeated, make common item.

    const onChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const amount = parseInt( event?.target?.value || "1" );

        ZenCore.managers.commands.run( "Catalog/Item/Commands/SetAmount", {
            ...data,
            amount
        } );

        setAmount( amount );
    };

    const [ amount, setAmount ] = React.useState( 1 );

    return (
        <div className="product">
            <img src={ imageURL } alt={ "product" + id }/>
            <h4 className="name color-secondary">{ name }</h4>

            <div className="footer">
                <h5>Price: <span className="price">${ price }$</span></h5>
                <div className="row">
                    <button
                        onClick={ () => ZenCore.managers.commands.run( "Catalog/Item/Commands/Add", {
                            ...data,
                            amount,
                        } ) }
                        className="bg-primary">Add To Cart
                    </button>
                    <input
                        onChange={ onChange } className="amount" type="number" name="amount" value={ amount } min="1"/>
                </div>
            </div>
        </div>
    );
}

export default React.memo( ItemComponent );
