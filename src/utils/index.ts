import { RouteRecordRaw } from "vue-router";
import { IMenuItem, ITreeMenuItem, IUserRouterItem } from "../interface/menu";

const modules = import.meta.glob("../view/**/**.vue");

interface ICache {
  [key: number]: ITreeMenuItem
}
/**
 * @description 转换树形结构菜单
 * @param menuList 菜单列表
 * @author JJYang
 */
export const getTreeMenus = (menuList: IMenuItem[]): ITreeMenuItem[] => {
  const treeMenuList = [] as ITreeMenuItem[];
  const cache: ICache = {};

  menuList.forEach((treeItem) => {
    cache[treeItem.rid] = treeItem;
  });

  menuList.forEach((treeItem) => {
    const parent = cache[treeItem.pid];
    if (parent) {
      if (!parent.children) {
        parent.children = [] as IMenuItem[];
      }
      parent.children.push(treeItem);
    } else {
      treeMenuList.push(treeItem);
    }
  });
  return treeMenuList;
};


/**
 * @description 转化动态路由
 * @param userRouters --用户路由的树形列表
 * @param parentName --父级路由的name
 * @author JJYang
 */
export const generateRouter = (userRouters: ITreeMenuItem[], parentName: string | undefined = undefined) => {
  let newRouters: RouteRecordRaw[] = userRouters.map((router: ITreeMenuItem) => {
    const isParent = router.pid === 0 && router.children;
    let routes: RouteRecordRaw;
    if (isParent) {
      routes = {
        path: "/" + router.path,
        redirect: "/" + router.path + "/" + router.children![0].path,
        name: router.name,
        meta: {
          icon: router.icon,
        },
        component: () =>
          import(/* @vite-ignore */ `../components/ParentView/ParentView.vue`),
      };
    } else {
      routes = {
        path: router.path,
        name: router.name,
        meta: {
          icon: router.icon,
        },
        component:
          modules[
            /* @vite-ignore */ `../view/${parentName}/${router.name}/${router.name}.vue`
          ],
      };
    }
    if (routes && router.children) {
      routes.children = generateRouter(router.children, router.name);
    }
    return routes;
  });
  return newRouters;
};

export const flatter = (target: any) => {
  let result: any = [];
  target.forEach((item: any) => {
    if (Array.isArray(item)) {
      result = result.concat(flatter(item));
    } else {
      result.push(item);
    }
  });
  return result;
};



