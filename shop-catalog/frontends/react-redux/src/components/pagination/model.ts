import React from "react";

import ZenCore from "@zenflux/core";

export type ExtendType = "prev" | "next";

export type OffsetStateType = [ number, React.Dispatch<React.SetStateAction<number>> ];

export interface IPaginationProps {
    maxVisiblePages: number;
    currentPage: number;
    totalPages: number;
    controller: ZenCore.core.Controller;
}

export interface IPublicCommandPaginationExtendArgs {
    type: ExtendType,
    offsetState: OffsetStateType,
    maxVisiblePages: number,
    controller: ZenCore.core.Controller,
}

export interface IPublicCommandPaginationSetArgs {
    page: number,
    controller: ZenCore.core.Controller,
}
