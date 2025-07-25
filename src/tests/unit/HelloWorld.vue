<script  lang="ts">
import Hello from './Hello.vue'
import {defineComponent} from "vue";

export default defineComponent({
    name: "HelloWorld",
    components: {
        Hello
    },
    props: {
        msg: {
            type: String,
            default: "hello world"
        }
    },
    data() {
        return {
            count: 0
        }
    }
})

</script>

<template>
    <h1>{{msg}}</h1>
    <button @click="count++">{{count}}</button>
    <hello msg="1234"></hello>
</template>

<style scoped>

</style>