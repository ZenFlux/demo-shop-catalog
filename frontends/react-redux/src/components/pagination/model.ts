import React from "react";

import ZenCore from "@zenflux/core";

export type ExtendType = "prev" | "next";

export interface IPaginationProps {
    maxVisiblePages: number;
    currentPage: number;
    totalPages: number;
    controller: ZenCore.core.Controller;
}

export interface IPublicCommandPaginationExtendArgs {
    type: ExtendType,
    range: number;
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    controller: ZenCore.core.Controller,
}

export interface IPublicCommandPaginationSetArgs {
    page: number,
    controller: ZenCore.core.Controller,
}
