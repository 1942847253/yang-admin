<template>
  <div class="menu-content">
    <el-card class="box-card1" shadow="never">
      <template #header>
        <div class="card-header">
          <el-dropdown @command="handleCommand">
            <el-button>
              添加菜单 <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="parent"
                  >添加父级菜单</el-dropdown-item
                >
                <el-dropdown-item
                  command="child"
                  :disabled="!isChecked || pid == 0"
                  >添加子菜单</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      <div class="menu-list">
        <el-tree
          ref="treeRef"
          :expand-on-click-node="false"
          :highlight-current="true"
          :data="menuListData"
          @node-click="clickTree"
          show-checkbox
          node-key="rid"
          default-expand-all
          :props="defaultProps"
        />
      </div>
    </el-card>
    <el-card class="box-card2" shadow="never">
      <template #header>
        <div class="card-header">
          <div class="menu-iocn">
            <el-icon style="color: #1890ff; font-size: 20px"><Menu /></el-icon>
          </div>
          <span>编辑菜单：{{ checkedMenu && checkedMenu.title }}</span>
        </div>
      </template>
      <div class="menu-form">
        <el-alert
          title="从菜单列表选择一项后，进行编辑"
          type="success"
          :closable="false"
        />

        <el-form
          ref="ruleFormRef"
          :model="checkedMenu"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="类型："> 侧边栏 </el-form-item>
          <el-form-item label="菜单名称:" prop="username">
            <el-input
              v-model="checkedMenu.title"
              placeholder="请输入菜单名称"
            />
          </el-form-item>
          <el-form-item label="菜单图标:" prop="password">
            <el-input v-model="checkedMenu.icon" placeholder="请输入菜单图标" />
          </el-form-item>
          <el-form-item label="路由地址:" prop="password">
            <el-input v-model="checkedMenu.path" placeholder="请输入路由地址" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="!isChecked"
              >确认</el-button
            >
            <el-button @click="cancelClick">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <MenuAdd
      :menuAddVisible="menuAddVisible"
      :pid="pid"
      :parentTitle="parentTitle"
      @menuAddVisibleClose="menuAddVisibleClose"
      @menuAddSuccess="menuAddSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useUserStore } from "src/store/userStore";
import { IMenuItem, ITreeMenuItem } from "src/interface/menu";
import { getMenuList, updateMenuApi } from "src/apis/user";
import { deepClone, getTreeMenus } from "src/utils";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { ElMessage } from "element-plus";
import MenuAdd from "./component/MenuAdd.vue";
export default defineComponent({
  name: "menuEdit",
  components: {
    MenuAdd,
  },
  setup() {
    const ruleFormRef = ref();
    const store = useUserStore();
    const menuListData = ref<ITreeMenuItem[]>([]);
    const pid = ref<number>(0);
    const parentTitle = ref<string>("");
    const treeRef = ref();
    const checkedMenu = ref<IMenuItem>({} as IMenuItem);
    const menuAddVisible = ref<boolean>(false);
    const isChecked = ref<boolean>(false);
    const defaultProps = {
      children: "children",
      label: "title",
    };

    const { setLocalStorage, getLocalStorage } = useLocalStorage();

    onMounted(() => {
      getMenuListData();
      localStorage.removeItem("menuCache");
    });

    const getMenuListData = async () => {
      const data: IMenuItem[] = await getMenuList();
      menuListData.value = getTreeMenus(data);
      pid.value = 0;
      checkedMenu.value = {} as IMenuItem;
    };

    const clickTree = (menuItem: IMenuItem) => {
      const data = deepClone(
        store.menuList.find((item) => menuItem.rid === item.rid)
      );
      checkedMenu.value = data;
      isChecked.value = true;
      pid.value = checkedMenu.value.rid;
      parentTitle.value = checkedMenu.value.title;

      setLocalStorage("menuCache", data);
    };

    const menuAddVisibleClose = () => {
      menuAddVisible.value = false;
      pid.value = checkedMenu.value.rid;
    };
    const menuAddSuccess = () => {
      getMenuListData();
      store.getMenuList();
    };

    const handleCommand = (command: string) => {
      if (command === "parent") {
        pid.value = 0;
        menuAddVisible.value = true;
      } else {
        menuAddVisible.value = true;
      }
    };

    const onSubmit = () => {
      ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          await updateMenuApi(checkedMenu.value);
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          checkedMenu.value = {} as IMenuItem;
          localStorage.removeItem("menuCache");
          store.getMenuList();
          getMenuListData();
        }
      });
    };

    const cancelClick = () => {
      const menuCache = getLocalStorage("menuCache");
      menuCache && (checkedMenu.value = menuCache);
    };

    return {
      pid,
      treeRef,
      menuListData,
      defaultProps,
      checkedMenu,
      ruleFormRef,
      isChecked,
      menuAddVisible,
      parentTitle,
      clickTree,
      onSubmit,
      cancelClick,
      handleCommand,
      menuAddSuccess,
      menuAddVisibleClose,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
