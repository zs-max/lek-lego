<script  lang="ts">
import Hello from './Hello.vue'
import {defineComponent, ref} from "vue";

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
    emits: ['send'],
    setup(props, context) {
        const todo = ref('')
        const todos = ref([])
        const count = ref(1)
        const setCount = () => {
           count.value++
        }
        const addTodo = () => {
          if(todo.value !== '') {
            todos.value.push(todo.value)
            context.emit('send', todo.value)
          }
        }

        return {
            count,
            todo,
            todos,
            setCount,
            addTodo
        }
    }
})

</script>

<template>
    <h1>{{msg}}</h1>
    <button @click="setCount">{{count}}</button>
    <input v-model="todo" type="text">
    <button class="addTodo" @click="addTodo">添加</button>
    <ul>
        <li v-for="(item, index) in todos" :key="index">{{item}}</li>
    </ul>
    <hello msg="1234"></hello>
</template>

<style scoped>

</style>