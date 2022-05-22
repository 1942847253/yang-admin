import { reactive } from "vue";

export const validatePass = (rule: any, value: string | any[], callback: (arg0?: Error | undefined) => void) => {
  if (value === "" || value.length < 5) {
    callback(new Error("用户名必须大于5位数"));
  } else {
    callback();
  }
};

export const validatePass2 = (rule: any, value: string | any[], callback: (arg0?: Error | undefined) => void) => {
  if (value === "" || value.length < 5) {
    callback(new Error("密码长度不得少于5位"));
  } else {
    callback();
  }
};

export const rules = reactive({
  username: [{ validator: validatePass, trigger: "blur" }],
  password: [{ validator: validatePass2, trigger: "blur" }],
});
