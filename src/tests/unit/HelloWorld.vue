<script  lang="ts">
import Hello from './Hello.vue'
import {defineComponent, reactive, ref} from "vue";
import axios from "axios";

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
        const user = reactive({
          data:null as any,
          loading:false,
          error:false
        })
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

        const loadUser =  () => {
          user.loading = true
          axios.get('https://jsonplaceholder.typicode.com/users/1').then(resp=>{
            console.log(resp)
            user.data = resp.data
          }).catch(()=>{
              user.error = true
          }).finally(()=>{
              user.loading = false
          })
        }

        return {
            count,
            todo,
            todos,
            setCount,
            addTodo,
            loadUser,
            user
        }
    }
})

</script>

<template>
    <h1>{{msg}}</h1>
    <button @click="setCount">{{count}}</button>
    <input v-model="todo" type="text">
    <button class="addTodo" @click="addTodo">添加</button>
    <p class="loading" v-if="user.loading">Loading</p>
    <div v-else class="userName">{{user.data && user.data.username}}</div>
    <p class="error" v-if="user.error">Error</p>
    <button class="loadUser" @click="loadUser">加载用户</button>
    <ul>
        <li v-for="(item, index) in todos" :key="index">{{item}}</li>
    </ul>
    <hello msg="1234"></hello>
</template>

<style scoped>

</style>