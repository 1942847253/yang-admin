import { defineStore } from 'pinia'
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { getUserMenu } from '../apis/user';
import { IMenuItem, INavItem, ITreeMenuItem } from '../interface/menu';
import { flatter, getTreeMenus } from '../utils/index'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            test: document.querySelector('html')!.className,
            dark: false,
            menuList: [] as IMenuItem[],
            userRouters: [] as ITreeMenuItem[],
            navList: [{ title: "首页", path: "/index/home" }] as INavItem[],
            collapse: false,
        }
    },
    actions: {
        async getMenuList() {
            const { getLocalStorage } = useLocalStorage();
            this.menuList = await getUserMenu(getLocalStorage('uid')) as IMenuItem[];
        },
        // 获取用户树形结构菜单
        async setUserRouters(uid: string) {
            const menuList = await getUserMenu(uid) as IMenuItem[];
            this.menuList = menuList;
            this.userRouters = getTreeMenus(menuList);
        },

        //关闭nav导航
        closeNav(index: number) {
            this.navList.splice(index, 1);
        },

        //新增nav导航
        setNavList(path: string) {
            let menuList: any[] = [];
            const navItem = {} as INavItem;
            this.userRouters.forEach((item: ITreeMenuItem) => {
                menuList.push(item.children);
            });
            menuList = flatter(menuList);
            menuList.forEach((item: ITreeMenuItem) => {
                if (item && item.path == path) {
                    navItem.title = item.title;
                    navItem.path = item.path;
                }
            });
            const isBeing = this.navList.some((item: INavItem) => item.path == navItem.path);
            if (!isBeing && navItem && navItem.path) {
                this.navList.push(navItem)
            }
        },

        //关闭当前标签和首页标签之外的所有标签
        cloneOtherNav(currrentPath: string) {
            this.navList = [{ title: "首页", path: "/index/home" }];
            this.setNavList(currrentPath);
        },

        // 黑夜模式切换
        darkSwitch() {
            const html = document.querySelector('html')!;
            if (this.dark) {
                html.className = 'dark';

            } else {
                html.className = '';
            }
        }

    }
})

