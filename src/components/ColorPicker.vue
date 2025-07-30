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
  ''
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
.lego-color-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 80px;
    height: 50px;
    border: 0px;
    padding:0px;
  }
}
.picked-color-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  margin: 5px;
}


.picked-color-list li {
  list-style: none;

  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}

.color-item {
  padding: 3px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
}

.transparent-back {
background: url("~@/assets/img/transparent.png");
}
</style>