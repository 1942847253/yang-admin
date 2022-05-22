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

export const insertUserApi = (data: IUserInsertReq) => {
    return Fetch.request({
        url: '/insertUser',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err
    })
}

export interface IUserInsertReq extends IUserLoginReq {
    position: string
}


export const findUserApi = (id: string) => {
    return Fetch.request<IUserInsertReq>({
        url: '/findUser',
        method: 'post',
        data: { id }
    }).catch((err) => {
        throw err
    })
}

export const updateUserApi = (id: string, data: IUserInsertReq) => {
    return Fetch.request({
        url: '/updateUser',
        method: 'post',
        data: { id, data }
    }).catch((err) => {
        throw err
    })
}


export const getUserListApi = () => {
    return Fetch.request<IGetUserListItem[]>({
        url: '/getUserList',
        method: 'post',
    }).catch((err) => {
        throw err
    })
}

export interface IGetUserListItem extends IUserLoginReq {
    _id: string;
    position: IGetRoleItem;
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

// 编辑菜单
export const updateMenuApi = (data: IMenuItem) => {
    return Fetch.request({
        url: '/updateMenu',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err;
    });
};

// 添加父级菜单
export const insertParentMenuApi = (data: IInertMenuItem) => {
    return Fetch.request({
        url: '/insertParentMenu',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err;
    });
};
export interface IInertMenuItem {
    icon: string;
    path: string;
    title: string;
    pid?: number;
}

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
