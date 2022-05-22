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
 * @author JJYang
 */
export const generateRouter = (userRouters: ITreeMenuItem[]) => {
  let newRouters: RouteRecordRaw[] = userRouters.map((router: ITreeMenuItem) => {
    const isParent = router.pid === 0 && router.children;
    const fileName = router.path.match(/\/([^/]*)$/)![1]
    let routes: RouteRecordRaw = {
      path: router.path,
      name: router.name,
      meta: {
        icon: router.icon,
      },
      component:
        modules[
            /* @vite-ignore */ `../view${router.path}/${fileName}.vue`
        ],
    };
    if (isParent) {
      routes.redirect = router.children![0].path;
      routes.component = () =>
        import(/* @vite-ignore */ `../components/ParentView/ParentView.vue`)
    }
    if (routes && router.children) {
      routes.children = generateRouter(router.children);
    }
    return routes;
  });
  return newRouters;
};

/**
 * @description 数组扁平化
 * @param target --目标数组
 * @author JJYang
 */
export function flatter(target: any) {
  if (Array.isArray(target)) {
    let result: any = [];
    target.forEach((item) => {
      if (Array.isArray(item)) {
        result = result.concat(flatter(item));
      } else {
        result.push(item);
      }
    });
    return result;
  } else {
    return target
  }
};


export const deepClone = (target: any, map: any = new Map()) => {
  if (typeof target === 'object' && target !== null) {
    const cache = map.get(target);
    if (cache) {
      return cache;
    }
    const isArray = Array.isArray(target);
    let result: any = isArray ? [] : {};
    map.set(target, result);
    if (isArray) {
      target.forEach((item, index) => {
        result[index] = deepClone(item, map);
      })
    } else {
      Object.keys(target).forEach(key => {
        result[key] = deepClone(target[key], map);
      })
    }
    return result;
  } else {
    return target
  }
}



