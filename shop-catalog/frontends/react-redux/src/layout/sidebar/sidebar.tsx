import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import Cart from "@internal/iron/cart/cart";

import './sidebar.css';

export default function Sidebar() {
    const status = ZenRedux.hooks.useControllerProperty( 'UI/Sidebar/Controller', 'status' );

    return (
        <>
            <div id="sidebar" className={ status ? 'show' : '' }>
                <div id="header">
                    <h2>YOUR CART</h2>
                    <button onClick={ () => {
                        ZenCore.managers.commands.run( 'UI/Sidebar/Commands/Toggle' )
                    } } id="close">&#12297;</button>
                </div>
                <Cart/>
            </div>
            <div id="overlay" className={ status ? 'show' : 'hide' } onClick={ () => {
                ZenCore.managers.commands.run( 'UI/Sidebar/Commands/Toggle' )
            } }/>
        </>
    )
}
