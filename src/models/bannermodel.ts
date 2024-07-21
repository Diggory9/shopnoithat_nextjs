export interface BannerModel {
    id?: string;
    url?: string;
    isEnable?: boolean;
    dateCreate?: string;
    groupBanner?: {
        id?: string;
        groupName?: string;
        isEnable?: boolean;
        dateCreate?: string;
    }
}

// Group Banner
export interface GroupBannerModel {
    id?: string;
    groupName?: string;
    isEnable?: boolean;
    dateCreate?: string;

}
export interface DetailGroupBannerModel {
    id?: string;
    groupName?: string;
    isEnable?: boolean;
    dateCreate?: string;
    banners?: Banner[];

}
export interface Banner {
    id?: string;
    url?: string;
    isEnable?: boolean;
}