import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import CatalogController from "@internal/iron/catalog/controller";

export class PagesController extends ZenRedux.core.RouterController {
    static getName() {
        return "Pages/Controller";
    }

    getRoutes() {
        return {
            "Catalog": () => {
                const catalogController = ZenCore.managers.controllers.get( "Catalog/Controller" ) as CatalogController;

                catalogController.getCatalog();
            },
            "Checkout": () => {},
        };
    }
}

export default PagesController;
