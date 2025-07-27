<script setup lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    props:{
        value:{
            type:String,
            default:'#ffffff'
        }
})
    }
</script>

<template>
   <div class="lego-color-picker">
   </div>
</template>

<style scoped>

</style>