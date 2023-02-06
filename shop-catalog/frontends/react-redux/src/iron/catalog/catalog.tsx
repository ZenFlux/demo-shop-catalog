import React from "react";

import ZenCore from "@zenflux/core";

import Item from "./item/item";

import CatalogController from "@internal/iron/catalog/controller";

import PageTransaction from "@internal/components/transaction/page-transaction";
import Pagination from "@internal/components/pagination/pagination";

import { CATALOG_MAX_VISIBLE_PAGES, CATALOG_TRANSACTION_TIMEOUT, } from "./constants";

export default function Catalog() {
    const controller = ZenCore.managers.controllers.get( "Catalog/Controller" ) as CatalogController,
        state = controller.getState(),
        items = state.items,
        pagination = state.pagination;

    return (
        <PageTransaction timeout={ CATALOG_TRANSACTION_TIMEOUT }>
            <div id="catalog" className="row">
                {
                    items.map( ( item ) => <Item key={ item.id.toString() } { ...item } /> )
                }
            </div>

            <Pagination
                maxVisiblePages={ CATALOG_MAX_VISIBLE_PAGES }
                currentPage={ pagination.current }
                totalPages={ pagination.pages }
                controller={ controller }
            />
        </PageTransaction>
    );
}
