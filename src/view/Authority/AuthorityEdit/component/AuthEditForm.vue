<template>
  <div>
    <el-drawer
      v-model="isVisible"
      :title="`关联菜单：${roleListItem.name}`"
      :with-header="true"
      size="20%"
      @close="cancelClick"
    >
      <el-tree
        ref="treeRef"
        :data="menuListData"
        show-checkbox
        node-key="rid"
        default-expand-all
        :default-checked-keys="roleMenu"
        :props="defaultProps"
      />
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import {
  getMenuList,
  getRoleMenu,
  IGetRoleItem,
  updateRoleMenu,
} from "src/apis/user";
import { IMenuItem, ITreeMenuItem } from "src/interface/menu";
import { getTreeMenus } from "src/utils/index";
export default defineComponent({
  name: "AuthEditForm",
  components: {},
  props: {
    authEditFormVisible: {
      type: Boolean,
      default: false,
    },
    roleListItem: {
      type: Object as PropType<IGetRoleItem>,
      default: {},
    },
  },
  emits: ["authEditFormVisibleClose", "roleMenuUpdateSuccess"],
  setup(props, { emit }) {
    const menuListData = ref<ITreeMenuItem[]>([]);
    const isVisible = ref<boolean>(false);
    const roleMenu = ref([]);
    const treeRef = ref();
    const defaultProps = {
      children: "children",
      label: "title",
    };
    watch(
      () => props.authEditFormVisible,
      (val) => {
        if (val) {
          isVisible.value = val;
          getMenuListData();
          getRoleMenuData(props.roleListItem._id);
        } else {
          roleMenu.value = [];
          isVisible.value = val;
        }
      }
    );

    const getMenuListData = async () => {
      const data: IMenuItem[] = await getMenuList();
      menuListData.value = getTreeMenus(data);
    };

    const getRoleMenuData = async (id: string) => {
      const data = await getRoleMenu(id);
      roleMenu.value = data;
    };

    const confirmClick = async () => {
      let checkedRoleIds: number[] = [];
      treeRef.value
        .getCheckedNodes(false, false)
        .forEach((item: { rid: number; pid: number }) => {
          if (item.rid && item.pid !== 0) {
            checkedRoleIds.push(item.rid);
          }
        });
      const data = {
        roleMenuIds: checkedRoleIds,
        id: props.roleListItem._id,
      };
      await updateRoleMenu(data);
      emit("authEditFormVisibleClose");
    };

    const cancelClick = () => {
      emit("authEditFormVisibleClose");
    };
    return {
      emit,
      menuListData,
      defaultProps,
      roleMenu,
      treeRef,
      confirmClick,
      cancelClick,
      isVisible,
    };
  },
});
</script>
