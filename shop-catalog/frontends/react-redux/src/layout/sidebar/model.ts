import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface SidebarState {
    status: boolean;
}

export interface ISidebarReducers extends SliceCaseReducers<SidebarState> {
    activate: CaseReducer<SidebarState, PayloadAction<SidebarState>>;
    deactivate: CaseReducer<SidebarState, PayloadAction<SidebarState>>;
    toggle: CaseReducer<SidebarState, PayloadAction>;
}
