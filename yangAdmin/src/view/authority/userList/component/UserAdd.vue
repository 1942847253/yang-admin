<template>
  <div>
    <el-drawer
      v-model="isVisible"
      :title="`添加用户`"
      :with-header="true"
      size="22%"
      @close="cancelClick"
    >
      <el-form
        ref="ruleFormRef"
        :model="formState"
        :rules="rules"
        label-width="65px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formState.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item v-if="!uId" label="密码" prop="password">
          <el-input v-model="formState.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色" prop="position">
          <el-select v-model="formState.position" placeholder="请选择角色">
            <el-option
              v-for="item in roleListDate"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, onMounted } from "vue";
import {
  IGetRoleItem,
  IUserInsertReq,
  getRoleList,
  insertUserApi,
  findUserApi,
  updateUserApi,
} from "src/apis/user";
import { IMenuItem, ITreeMenuItem } from "src/interface/menu";
import { getTreeMenus } from "src/utils/index";
import { validatePass, validatePass2 } from "src/view/login/baseData";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "UserAdd",
  components: {},
  props: {
    userAddVisible: {
      type: Boolean,
      default: false,
    },
    uId: {
      type: String,
      default: "",
    },
  },
  emits: ["userAddVisibleClose", "userAddSuccess"],
  setup(props, { emit }) {
    const ruleFormRef = ref();
    const formState = reactive<IUserInsertReq>({
      username: "",
      password: "",
      position: "",
    });
    const roleListDate = ref<IGetRoleItem[]>([]);
    const isVisible = ref<boolean>(false);

    const rules = reactive({
      username: [{ required: true, validator: validatePass, trigger: "blur" }],
      password: [{ required: true, validator: validatePass2, trigger: "blur" }],
      position: [
        {
          required: true,
          message: "请选择角色",
          trigger: "change",
        },
      ],
    });

    watch(
      () => props.userAddVisible,
      (val) => {
        if (val) {
          isVisible.value = val;
          props.uId && getUserInfo();
        } else {
          isVisible.value = val;
        }
      }
    );

    onMounted(() => {
      getRoleListDate();
    });

    const getRoleListDate = async () => {
      roleListDate.value = await getRoleList();
    };

    const getUserInfo = async () => {
      const data = await findUserApi(props.uId);
      formState.position = data.position;
      formState.username = data.username;
    };

    const cancelClick = () => {
      ruleFormRef.value.resetFields();
      emit("userAddVisibleClose");
    };

    const onSubmit = () => {
      ruleFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(formState));
          const id = props.uId;
          if (id) {
            await updateUserApi(props.uId, data);
            ElMessage({
              message: "修改成功",
              type: "success",
            });
          } else {
            await insertUserApi(data);
            ElMessage({
              message: "添加成功",
              type: "success",
            });
          }
          cancelClick();
          emit("userAddSuccess");
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
