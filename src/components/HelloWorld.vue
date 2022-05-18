<template>
{{ count.a}} 
<button @click="addCount">add</button>
</template>

<script lang="ts" setup>
import { useUserStore } from "../store/userStore";
import {storeToRefs} from 'pinia'

const userStore = useUserStore();
const {count} = storeToRefs(userStore);

const addCount = () :void=>{
    userStore.updateCount();
}
</script>
