import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import SidebarController from "@internal/layout/sidebar/controller";

export class Toggle extends ZenCore.commandBases.CommandPublic {
    static getName() {
        return "Layout/Sidebar/Commands/Toggle";
    }

    apply() {
        const controller = ZenCore.managers.controllers.get( "Layout/Sidebar/Controller" ) as SidebarController;

        // Toggle the sidebar.
        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.toggle()
        );
    }
}
