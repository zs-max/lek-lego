<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
    props: {
        msg: {
            type: String,
            default: "hello world"
        }
    }
})
</script>

<template>
   <h1 class="hello">{{msg}}</h1>
</template>

<style scoped>

</style>