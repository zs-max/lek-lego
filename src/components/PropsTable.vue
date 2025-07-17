
<template>
  <div class="props-table">
    <div v-for="(value,key) in finalProps" :key="key" class="prop-item">
      <component v-if="value" :is="value.component" :value="value.value"></component>
    </div>
  </div>
</template>

<script  lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {TextComponentProps} from "@/defaultProps";
import {reduce} from "lodash-es";
import {mapPropsToForms, PropsToForm} from "@/propsMap";

export default defineComponent({
  name:"props-table",
  props:{
    props:{
      type:Object as PropType<TextComponentProps>
    }
  },
  setup(props){
      const finalProps = computed(()=>{
        return reduce(props.props,(result,value,key)=>{
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if(item){
            item.value = value
            result[newKey] = item
          }
          return result
        },{} as PropsToForm)
      })
    return {
      finalProps
    }
  }
})
</script>


<style scoped>

</style>