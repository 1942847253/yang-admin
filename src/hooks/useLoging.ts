import { ElMessage } from "element-plus";
import { Ref } from "vue";

const useLoging = () => {
    async function setLoging<T, D>(loginApi: (data: T) => Promise<D>, data: T, isLoging: Ref<boolean>): Promise<Awaited<D>> {
        try {
            isLoging.value = true;
            const result = await loginApi(data);
            isLoging.value = false;
            ElMessage({
                message: "登录成功",
                type: "success",
            });
            return result
        } catch (err: any) {
            isLoging.value = false;
            throw new Error(err);
        }
    }
    return {
        setLoging,
    }
}

export default useLoging