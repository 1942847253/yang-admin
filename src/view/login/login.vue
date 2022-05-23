<template>
  <div class="login-content">
    <el-card class="box-card">
      <h2 class="title">YangAdmin</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            size="large"
            v-model="ruleForm.username"
            placeholder="用户名：admin"
            autocomplete="off"
            prefix-icon="UserFilled"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="密码：123456"
            @keyup.enter.navtive="submitForm"
            prefix-icon="Key"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%; height: 40px; font-size: 15px; margin-top: 10px"
            type="primary"
            :loading="isLoging"
            @click="submitForm"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { rules } from "./baseData";
import { IUserLoginReq, IUserLoginRes, userLoginApi } from "../../apis/user";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import useLoging from "src/hooks/useLoging";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const ruleFormRef = ref();
    const router = useRouter();
    const ruleForm = reactive<IUserLoginReq>({
      username: "admin",
      password: "",
    });

    const { setLocalStorage } = useLocalStorage();
    const { isLoging, setLoging } = useLoging();

    const submitForm = async () => {
      ruleFormRef.value.validate(async (valid: boolean) => {
        valid &&
          setLoging<IUserLoginReq, IUserLoginRes>(userLoginApi, ruleForm).then(
            (res) => {
              setLocalStorage("token", res.token);
              setLocalStorage("uid", res.uid);
              router.replace("/");
            }
          );
      });
    };

    return {
      rules,
      ruleFormRef,
      ruleForm,
      isLoging,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.box-card {
  width: 420px;
  height: 250px;
  padding: 0px 15px 40px 15px;
  position: absolute;
  opacity: 0.85;
  top: 25%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.login-content {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/images/bg.jpg") !important;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
}
</style>
