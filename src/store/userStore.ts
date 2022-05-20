import { defineStore } from 'pinia'
import { getUserMenu } from '../apis/user';
import { IMenuItem, INavItem, ITreeMenuItem } from '../interface/menu';
import { flatter, getTreeMenus } from '../utils/index'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userRouters: [] as ITreeMenuItem[],
            navList: [{ title: "首页", path: "/index/home" }] as INavItem[],
            collapse: false,
        }
    },
    actions: {
        // 获取用户树形结构菜单
        async setUserRouters(uid: string) {
            const menuList = await getUserMenu(uid) as IMenuItem[];
            this.userRouters = getTreeMenus(menuList);
        },

        //新增nav导航
        closeNav(index: number) {
            this.navList.splice(index, 1);
        },
        //新增nav导航
        setNavList(path: string) {
            let menuList: any = [];
            const navItem = {} as INavItem;
            this.userRouters.forEach((item) => {
                menuList.push(item.children);
            });
            menuList = flatter(menuList);
            menuList.forEach((item: ITreeMenuItem) => {
                if (item && item.link == path) {
                    navItem.title = item.title;
                    navItem.path = item.link;
                }
            });
            const isBeing = this.navList.some((item: INavItem) => item.path == navItem.path);
            if (!isBeing && navItem && navItem.path) {
                this.navList.push(navItem)
            }
        }
    }
})

