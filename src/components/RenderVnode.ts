
import { defineComponent, PropType } from 'vue'
interface RenderVnodeProps {
    vNode: object | string;
}

const RenderVnode = defineComponent({
  // 修正 props 定义语法
  props: {
    vNode: {
      type: [Object, String] as PropType<object | string>,
      required: true
    }
  },
  // 使用 setup 函数替代 render 函数，显式声明 props 类型
  render () {
    return this.vNode
  }
})

export default RenderVnode
