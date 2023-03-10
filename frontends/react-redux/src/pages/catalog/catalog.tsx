import ZenRedux from "@zenflux/redux";

import CatalogComponent from "@internal/iron/catalog/catalog";

import Spinner from "@internal/components/spinner/spinner";

export default function Catalog() {
    const items = ZenRedux.hooks.useControllerProperty( "Catalog/Controller", "items" );

    if ( ! items.length ) {
        return <Spinner color={ "red" }/>;
    }

    return (
        <div className="container">
            <CatalogComponent/>
        </div>
    );
}
