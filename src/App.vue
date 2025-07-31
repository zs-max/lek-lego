<template>
  <div class="app-container">
    <uploader action="http://local.test:7001/api/upload" />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  name: 'App',
  components:{
    Uploader
  }
});
</script>

<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
