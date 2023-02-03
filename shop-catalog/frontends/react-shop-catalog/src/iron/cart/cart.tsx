import ZenRedux from "@zenflux/redux";

import Item from "./item/item";

import { ICartState } from "@internal/iron/cart/model";

import { CART_FRACTION_DIGITS } from "./constants";

export default function Cart() {
    const controller = ZenRedux.hooks.useController( 'Cart/Controller' ) as ICartState,
        items = controller.items,
        total = controller.total,
        isCartEmpty = items.length === 0,
        totalClass = isCartEmpty ? 'total' : 'total open';

    return <div className="cart">
        { isCartEmpty ? <h1 id="empty">Your cart is empty.</h1> :
            <ul className="items">
                <li className={ totalClass }>
                    <h2>TOTAL</h2>
                    <h3><span className="price">{ total.toFixed( CART_FRACTION_DIGITS ) }</span></h3>
                </li>
                { items.map( ( item: any ) => <Item key={ item?.id } { ...item }  /> ) }
            </ul> }

        { ! isCartEmpty ?
            <button className="checkout bg-info"
                    onClick={ () => ZenRedux.managers.routes.to( 'Pages/Controller/Checkout' ) }>
                CHECKOUT
            </button> : null }
    </div>
}
