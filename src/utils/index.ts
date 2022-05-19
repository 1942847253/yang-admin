import { IMenuItem, ITreeMenuItem, IUserRouterItem } from "../interface/menu";

const modules = import.meta.glob("../view/**/**.vue");

/**
 * @description 转换树形结构菜单
 * @param menuList 
 * @author JJYang
 */
export const getTreeMenus = (menuList: IMenuItem[]): ITreeMenuItem[] => {
  const treeMenuList = [] as ITreeMenuItem[];
  const cache: any = {};

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
 * @param userRouters
 * @param parentName
 * @author JJYang
 */
export const generateRouter = (userRouters: ITreeMenuItem[], parentName: string | undefined = undefined) => {
  let newRouters = userRouters.map((router: ITreeMenuItem) => {
    const isParent = router.pid === 0 && router.children;
    let routes: IUserRouterItem;
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



