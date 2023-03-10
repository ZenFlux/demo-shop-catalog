import React from "react";

import ZenCore from "@zenflux/core";

import { ICartItem } from "../item/model";

import { CART_FRACTION_DIGITS } from "../constants";

import config from "@internal/config";

export default function Item( props: ICartItem ): JSX.Element {
    const sum = parseFloat( props.price ) * ( props.amount || 1 ),
        imageURL = config.baseURL + `/catalog/get_product_image/${ props.id }`, // TODO this line is repeated, make common item.
        removeItem = () =>
            ZenCore.managers.commands.run( "Cart/Item/Commands/Remove", { id: props.id } );

    return (
        <li className="item" data-id={ props.id }>
            <div className="thumbnail"><img alt="item" src={ imageURL }/></div>
            <div className="info">
                <h2>{ props.name }</h2>
                <button className="color-primary close" onClick={ removeItem }>
                    &times;
                </button>

                <div className="amount-price">
                    <span className="amount">{ props.amount }</span> x <strong>{ props.price }</strong>
                    <p className="sum">$<span className="value">{ sum.toFixed( CART_FRACTION_DIGITS ) }</span></p>
                </div>
            </div>

            <div className="clearfix"/>
        </li>
    );
}
