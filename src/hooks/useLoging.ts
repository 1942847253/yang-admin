import { ElMessage } from "element-plus";
import { ref } from "vue";

const useLoging = () => {
    const isLoging = ref<boolean>(false);
    async function setLoging<T, D>(loginApi: (data: T) => Promise<D>, data: T): Promise<Awaited<D>> {
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
        isLoging,
        setLoging,
    }
}

export default useLoging