<template>
  <el-drawer
    v-model="isVisible"
    :title="`${pid === 0 ? '添加父级菜单' : '添加子菜单：' + parentTitle}`"
    :with-header="true"
    size="22%"
    @close="cancelClick"
  >
    <el-form
      ref="ruleFormRef"
      :model="formState"
      :rules="rules"
      label-width="90px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称:" prop="title">
        <el-input v-model="formState.title" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单图标:" prop="icon">
        <el-input v-model="formState.icon" placeholder="请输入菜单图标" />
      </el-form-item>
      <el-form-item label="路由地址:" prop="path">
        <el-input v-model="formState.path" placeholder="请输入路由地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  IInertMenuItem,
  IGetRoleItem,
  insertParentMenuApi,
} from "../../../../apis/user";
export default defineComponent({
  name: "menuAdd",
  components: {},
  props: {
    menuAddVisible: {
      type: Boolean,
      default: false,
    },
    pid: {
      type: Number,
      default: 0,
    },
    parentTitle: {
      type: String,
      default: "",
    },
  },
  emits: ["menuAddVisibleClose", "menuAddSuccess"],
  setup(props, { emit }) {
    const ruleFormRef = ref();
    const formState = reactive<IInertMenuItem>({
      icon: "",
      path: "",
      title: "",
    });
    const roleListDate = ref<IGetRoleItem[]>([]);
    const isVisible = ref<boolean>(false);

    const rules = reactive({
      icon: [{ required: true, message: "请输入菜单图标", trigger: "blur" }],
      path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
      title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
    });

    watch(
      () => props.menuAddVisible,
      (val) => {
        if (val) {
          isVisible.value = val;
        } else {
          isVisible.value = val;
        }
      }
    );

    onMounted(() => {});

    const cancelClick = () => {
      ruleFormRef.value.resetFields();
      emit("menuAddVisibleClose");
    };

    const onSubmit = () => {
      ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(formState));
          const id = props.pid;
          if (id) {
            data.pid = id;
          }
          await insertParentMenuApi(data);
          ElMessage({
            message: "添加成功",
            type: "success",
          });
          cancelClick();
          emit("menuAddSuccess");
        }
      });
    };

    return {
      ruleFormRef,
      formState,
      rules,
      roleListDate,
      isVisible,
      cancelClick,
      onSubmit,
    };
  },
});
</script>
