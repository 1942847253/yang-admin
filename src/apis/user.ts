import Fetch from "../http/axios";
import { IMenuItem } from "../interface/menu";

import router from "../router/index";

export const userLogin = (data: IUserLoginReq) => {
    return Fetch.request<IUserLoginRes>({
        url: '/login',
        method: 'post',
        data
    })
};
export interface IUserLoginReq {
    password: string;
    username: string
}

export interface IUserLoginRes {
    token: string;
    uid: string;
    username: string;
}


export const getUserMenu = (uid: string) => {
    return Fetch.request<IMenuItem[]>({
        url: '/getUserMenu',
        method: 'post',
        data: { uid }
    }).catch((err) => {
        localStorage.clear();
        router.replace("/login");
    });

};

// 获取角色列表
export const getRoleList = () => {
    return Fetch.request<IGetRoleItem[]>({
        url: '/getRoleList',
        method: 'post',
    }).catch((err) => {
        throw err;
    });
};
export interface IGetRoleItem {
    _id: string;
    name: string;
    describe: string;
    menu: number[];
}

// 获取角色菜单
export const getRoleMenu = (id: string) => {
    return Fetch.request({
        url: '/getRoleMenu',
        method: 'post',
        data: { id }
    }).catch((err) => {
        throw err;
    });
};

// 获取全部菜单
export const getMenuList = () => {
    return Fetch.request({
        url: '/getMenuList',
        method: 'post',
    }).catch((err) => {
        throw err;
    });
};

// 更新角色菜单
export const updateRoleMenu = (data: any) => {
    return Fetch.request({
        url: '/updateRoleMenu',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err;
    });

};
