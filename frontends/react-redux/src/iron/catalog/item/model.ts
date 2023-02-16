export interface ICatalogItem {
    id: number;
    name?: string;
    price?: number;
    amount?: number;
}

export interface ICatalogItemProps extends ICatalogItem {
    key: string;
}
