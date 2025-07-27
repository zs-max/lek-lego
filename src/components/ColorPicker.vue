<script lang="ts">
import {defineComponent, PropType} from "vue";
import {startsWith} from "lodash-es";

const defaultColors = [
  '#ffffff',
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#808080',
  'transparent'
]

export default defineComponent({
  methods: {startsWith},
    props: {
      value: {
        type: String,
      },
      colors: {
        type: Array as PropType<string[]>,
        default: defaultColors
      }
    },
    emits:['change'],
    setup(props,context){
      const onChange = (color:string)=>{
        context.emit('change',color)
      }
      return {
        onChange:onChange
      }
    }
   })
</script>

<template>
   <div class="lego-color-picker">
     <div class="native-color-container">
       <input type="color" :value="value" @input="onChange($event.target.value)" />
     </div>
     <ul class="picked-color-list">
       <li v-for="(item,key) in colors" :key="key" :class="`item-${key}`" @click="onChange(item)">
         <div v-if="item.startsWith('#')" class="color-item" :style="{backgroundColor:item}"></div>
         <div v-else class="color-item transparent-back" >{{item}}</div>
       </li>
     </ul>
   </div>
</template>

<style scoped>

</style>