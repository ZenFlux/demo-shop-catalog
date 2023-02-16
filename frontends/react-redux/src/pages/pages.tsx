import ZenRedux from "@zenflux/redux";

import Catalog from "./catalog/catalog";
import Checkout from "./checkout/checkout";
import Spinner from "@internal/components/spinner/spinner";

function getCurrent() {
    const current = ZenRedux.hooks.useCurrentRoute( "Pages/Controller" );

    switch ( current ) {
    case "Catalog":
        return <Catalog/>;

    case "Checkout":
        return <Checkout/>;

    default:
        return <Spinner/>;
    }
}

export default function Pages() {
    return (
        <div className="page">
            { getCurrent() }
        </div>
    );
}
