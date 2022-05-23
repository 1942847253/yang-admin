<template>
  <div class="good-list-box">
    <Card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称：">
          <el-input v-model="formInline.user" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-select v-model="formInline.region" placeholder="请创建时间：">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户地址">
          <el-input v-model="formInline.user" placeholder="请输入用户地址" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </Card>
    <Card>
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        @click="handleAddUser"
        >+ 添加</el-button
      >
      <el-table :data="userList" :columns="Column" fixed="right" size="large">
        <el-table-column prop="_id" label="id" />

        <el-table-column
          v-for="(item, index) in Column"
          :prop="item.key"
          :label="item.title"
          :key="index"
        />
        <el-table-column label="角色">
          <template #default="scope">
            {{ scope.row.position.name }}
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template #default="scope">
            {{ scope.row.position.describe }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
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
    <UserAdd
      :userAddVisible="userAddVisible"
      :uId="uId"
      @userAddVisibleClose="userAddVisibleClose"
      @userAddSuccess="userAddSuccess"
    />
  </div>
</template>

<script lang="ts">
import Card from "src/components/Card/Card.vue";
import { defineComponent, reactive, onMounted, ref } from "vue";
import { Column } from "./baseData";
import { getUserListApi, IGetUserListItem } from "../../../apis/user";
import UserAdd from "./component/UserAdd.vue";
export default defineComponent({
  name: "userList",
  components: {
    Card,
    UserAdd,
  },
  setup() {
    const userList = ref<IGetUserListItem[]>([]);
    const userAddVisible = ref<boolean>(false);
    const uId = ref<string>("");
    const formInline = reactive({
      user: "",
      region: "",
    });

    onMounted(() => {
      getUserList();
    });

    const handleAddUser = () => {
      userAddVisible.value = true;
    };

    const userAddVisibleClose = () => {
      uId.value = "";
      userAddVisible.value = false;
    };

    const getUserList = async () => {
      userList.value = await getUserListApi();
    };

    const userAddSuccess = () => {
      getUserList();
    };

    const handleEdit = (row: IGetUserListItem) => {
      userAddVisible.value = true;
      uId.value = row._id;
    };

    const handleDelete = (index: number, row: any) => {};

    const onSubmit = () => {};

    return {
      uId,
      Column,
      userList,
      formInline,
      userAddVisible,
      onSubmit,
      handleEdit,
      handleDelete,
      handleAddUser,
      userAddVisibleClose,
      userAddSuccess,
    };
  },
});
</script>

<style lang="scss" scoped></style>
