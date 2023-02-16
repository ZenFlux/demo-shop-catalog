import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import Spinner from "@internal/components/spinner/spinner";

import { ICartState } from "@internal/iron/cart/model";

import "./navbar.css";

export default function Navbar() {
    const controller = ZenRedux.hooks.useController( "Cart/Controller" ) as ICartState,
        { items, loaded } = controller,
        totalItems = items.reduce( ( current, prev ) => current + ( prev.amount || 0 ), 0 ),
        shouldShowCart = loaded || items.length,
        toggle = () => ZenCore.managers.commands.run( "Layout/Sidebar/Commands/Toggle", );

    const cartToggle = shouldShowCart ?
        (
            <>
                <img className="cart" src="/img/cart.png" alt="cart"/>
                <span
                    className={ `amount bg-light ${ items.length ? "" : "hidden" }` }>{ totalItems }
                </span>
            </>
        ) : (
            <Spinner/>
        );

    return (
        <ul className="navbar">
            <li>
                <span id="logo">
                    <h2
                        onClick={ () => ZenRedux.managers.routes.to( "Pages/Controller/Catalog" ) }>My Shop
                    </h2>
                </span>
            </li>

            <li id="toggle" className="pointer" onClick={ toggle }>
                { cartToggle }
            </li>
        </ul>
    );
}
