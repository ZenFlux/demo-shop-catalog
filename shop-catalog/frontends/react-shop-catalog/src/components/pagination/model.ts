import React from "react";

import ZenCore from "@zenflux/core";

export type ExtendType = 'prev' | 'next';

export type offsetStateType = [ number, React.Dispatch<React.SetStateAction<number>> ];

export interface IPaginationProps {
    maxVisiblePages: number;
    currentPage: number;
    totalPages: number;
    controller: ZenCore.core.Controller;
}

export interface IPublicExtendCommandArgs {
    type: ExtendType,
    offsetState: offsetStateType,
    maxVisiblePages: number,
    controller: ZenCore.core.Controller,
}

export interface IPublicSetCommandArgs {
    page: number,
    controller: ZenCore.core.Controller,
}
