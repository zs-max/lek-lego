
<template>
  <div class="props-table">
    <div v-for="(value,key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{value.text}}</span>
      <div class="props-component">
        <component v-if="value" :is="value.component" :value="value.value" v-bind="value.extraProps"></component>
      </div>
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
        },{} as Required<PropsToForm>)
      })
    return {
      finalProps
    }
  }
})
</script>


<style scoped>
.prop-item{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.label{
  width: 28%;
}
.props-component{
  width: 70%;
}

</style>