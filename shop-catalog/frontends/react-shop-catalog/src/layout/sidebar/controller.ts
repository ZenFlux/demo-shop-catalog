import { Slice } from "@reduxjs/toolkit";

import ZenRedux from "@zenflux/redux";

import { ISidebarReducers, SidebarState } from "./model";

import * as commands from './commands/';

export class SidebarController extends ZenRedux.core.Controller {
    static getName() {
        return 'UI/Sidebar/Controller';
    }

    getCommands() {
        return commands;
    }

    getSliceInitialState(): SidebarState {
        return {
            status: false,
        }
    }

    getReducers(): ISidebarReducers {
        return {
            activate: ( state: SidebarState ) => {
                state.status = true;
            },
            deactivate: ( state: SidebarState ) => {
                state.status = false;
            },
            toggle: ( state: SidebarState ) => {
                state.status = ! state.status;
            }
        };
    }

    getState(): SidebarState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<any, ISidebarReducers>;
    }
}

export default SidebarController;
