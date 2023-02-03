import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IWelcomeState {
    mode: string
}

export interface IWelcomeReducers extends SliceCaseReducers<IWelcomeState> {
    setMode: CaseReducer<IWelcomeState, PayloadAction<string>>;
}
