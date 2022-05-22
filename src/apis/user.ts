import Fetch from "../http/axios";
import { IMenuItem } from "../interface/menu";

import router from "../router/index";

/**
 * @description 用户登录
 * @param data 
 * @interface IUserLoginReq
 */
export const userLoginApi = (data: IUserLoginReq) => {
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

/**
 * @description 添加用户
 * @param data 
 * @interface IUserInsertReq
 */
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

/**
 * @description 查找指定用户
 * @param id 
 */
export const findUserApi = (id: string) => {
    return Fetch.request<IUserInsertReq>({
        url: '/findUser',
        method: 'post',
        data: { id }
    }).catch((err) => {
        throw err
    })
}

/**
 * @description 编辑用户
 * @param id 
 * @param  data
 * @interface IUserInsertReq
 */
export const updateUserApi = (id: string, data: IUserInsertReq) => {
    return Fetch.request({
        url: '/updateUser',
        method: 'post',
        data: { id, data }
    }).catch((err) => {
        throw err
    })
}

/**
 * @description 获取用户列表
 */
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


/**
 * @description 获取用户菜单
 * @param uid 
 */
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

/**
 * @description 获取角色列表
 */
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


/**
 * @description 获取角色菜单
 * @param id 
 */
export const getRoleMenu = (id: string) => {
    return Fetch.request({
        url: '/getRoleMenu',
        method: 'post',
        data: { id }
    }).catch((err) => {
        throw err;
    });
};

/**
 * @description 获取菜单列表
 */
export const getMenuList = () => {
    return Fetch.request({
        url: '/getMenuList',
        method: 'post',
    }).catch((err) => {
        throw err;
    });
};

/**
 * @description 编辑菜单
 * @param data
 * @interface IMenuItem
 */
export const updateMenuApi = (data: IMenuItem) => {
    return Fetch.request({
        url: '/updateMenu',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err;
    });
};

/**
 * @description 添加父/子级菜单 区别：是否有传pid
 * @param data
 * @interface IInertMenuItem
 */
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

/**
 * @description 更新角色菜单
 * @param data
 * @interface IUpdateRoleMenu
 */
export const updateRoleMenuApi = (data: IUpdateRoleMenu) => {
    return Fetch.request({
        url: '/updateRoleMenu',
        method: 'post',
        data: data
    }).catch((err) => {
        throw err;
    });
};
export interface IUpdateRoleMenu {
    roleMenuIds: number[];
    id: string;
}
