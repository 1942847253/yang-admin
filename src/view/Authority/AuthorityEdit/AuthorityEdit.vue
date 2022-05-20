<template>
  <div class="good-list-box">
    <Card>
      <el-table :data="roleListDate" fixed="right" size="large">
        <el-table-column prop="_id" label="id" />
        <el-table-column
          v-for="(item, index) in Column"
          :prop="item.key"
          :label="item.title"
          :key="index"
        />
        <el-table-column label="操作" width="180px" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >关联菜单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        layout="->,prev, pager, next"
        :total="1000"
      />
    </Card>
    <AuthEditForm
      :authEditFormVisible="authEditFormVisible"
      :roleListItem="roleListItem"
      @authEditFormVisibleClose="authEditFormVisibleClose"
      @roleMenuUpdateSuccess="roleMenuUpdateSuccess"
    />
  </div>
</template>

<script lang="ts">
import Card from "@/components/Card/Card.vue";
import { defineComponent, onMounted, ref } from "vue";
import { getRoleList, IGetRoleItem } from "../../../apis/user";
import AuthEditForm from "./component/AuthEditForm.vue";
import { Column } from "./baseData";

export default defineComponent({
  name: "AuthorityEdit",
  components: {
    Card,
    AuthEditForm,
  },
  setup() {
    const authEditFormVisible = ref<boolean>(false);
    const roleListDate = ref<IGetRoleItem[]>([]);
    const roleListItem = ref<IGetRoleItem>({} as IGetRoleItem);

    onMounted(() => {
      getRoleListDate();
    });

    const getRoleListDate = async () => {
      roleListDate.value = await getRoleList();
    };

    const authEditFormVisibleClose = (): void => {
      authEditFormVisible.value = false;
    };

    const roleMenuUpdateSuccess = (): void => {
      getRoleListDate();
    };

    const handleEdit = (row: IGetRoleItem): void => {
      authEditFormVisible.value = true;
      roleListItem.value = row;
    };

    const handleDelete = (row: IGetRoleItem): void => {};

    const onSubmit = (): void => {};

    return {
      roleListDate,
      authEditFormVisible,
      roleListItem,
      Column,
      onSubmit,
      handleEdit,
      handleDelete,
      roleMenuUpdateSuccess,
      authEditFormVisibleClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
