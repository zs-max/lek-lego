<template>
    <home v-if="true" />
    <editor v-else />
</template>

<script lang="ts" setup>
import Home from './views/Home.vue'
import Editor from './views/Editor.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
