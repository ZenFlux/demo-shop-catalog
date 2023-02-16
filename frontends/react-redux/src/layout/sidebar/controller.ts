import { Slice } from "@reduxjs/toolkit";

import ZenRedux from "@zenflux/redux";

import { ISidebarReducers, SidebarState } from "./model";

import * as commands from "./commands/";

export class SidebarController extends ZenRedux.core.Controller {
    static getName() {
        return "Layout/Sidebar/Controller";
    }

    getCommands() {
        return commands;
    }

    getSliceInitialState(): SidebarState {
        return {
            status: false,
        };
    }

    getReducers(): ISidebarReducers {
        return {
            activate: ( state ) => {
                state.status = true;
            },
            deactivate: ( state ) => {
                state.status = false;
            },
            toggle: ( state ) => {
                state.status = ! state.status;
            }
        };
    }

    getState(): SidebarState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<SidebarState, ISidebarReducers>;
    }
}

export default SidebarController;
