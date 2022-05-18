import { defineStore } from 'pinia'

interface ICount {
    a: number
}
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            count: {
                a: 0
            } as ICount
        }
    },
    actions: {
        updateCount() {
            this.count.a++
        }
    }
})

