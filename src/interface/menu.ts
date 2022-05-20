export interface IMenuItem {
    _id: string;
    rid: number;
    pid: number;
    path: string;
    name: string;
    icon: string;
    title: string
}

export interface INavItem {
    title: string;
    path: string;
}

export interface ITreeMenuItem {
    _id: string;
    children?: ITreeMenuItem[];
    name: string | undefined;
    path: string;
    pid: number;
    icon: string;
    rid: number;
    title: string;
    link?: string;
}

export interface IUserRouterItem {
    name?: string | undefined;
    path: string;
    redirect?: string;
    meta?: { icon: string };
    children?: IUserRouterItem[];
    component?: any;
}