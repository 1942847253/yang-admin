<template>
  <div class="good-list-box">
    <Card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="门店名称：">
          <el-input v-model="formInline.user" placeholder="请输入门店名称" />
        </el-form-item>
        <el-form-item label="时间：">
          <el-select v-model="formInline.region" placeholder="请输入时间">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formInline.user" placeholder="请输入地址" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="onSubmit">重置</el-button>
        </el-form-item>
      </el-form>
    </Card>
    <Card>
      <el-button type="primary" style="margin-bottom: 10px" @click="onSubmit"
        >+ 添加</el-button
      >
      <el-table :data="tableData" fixed="right" size="large">
        <el-table-column
          v-for="(item, index) in Column"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :key="index"
        />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
  </div>
</template>

<script lang="ts">
import Card from "src/components/Card/Card.vue";
import { reactive, onMounted, defineComponent } from "vue";
import { Column, tableData } from "./baseData";
export default defineComponent({
  name: "goodsList",
  components: {
    Card,
  },
  setup() {
    const formInline = reactive({
      user: "",
      region: "",
    });

    onMounted(() => {});

    const handleEdit = (index: number, row: any) => {};

    const handleDelete = (index: number, row: any) => {};

    const onSubmit = () => {};

    return {
      formInline,
      tableData,
      Column,
      onSubmit,
      handleEdit,
      handleDelete,
    };
  },
});
</script>

<style lang="scss" scoped></style>
