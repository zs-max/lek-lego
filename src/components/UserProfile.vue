<template>
  <router-link to="/login" v-if="!user.isLogin">
      <a-button 
        type="primary"  
        class="user-profile-component"
        @click="login"
      >
        登录
      </a-button>
    </router-link>
  <div>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0">创建作品</a-menu-item>
          <a-menu-item key="1"
            ><router-link to="/works">我的作品</router-link></a-menu-item
          >
          <a-menu-item key="2" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { UserProps } from "@/store/user";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "user-profile",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const login = () => {
      store.commit('login')
      message.success('success',2)
    };
    const logout =()=>{
      store.commit('logout')
      message.success('success',2)
      setTimeout(()=>{
        router.push('/')
      },2000)
    }
    return {
      login,logout
    };
  },
});
</script>
<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}
.user-operation > * {
  margin-left: 30px !important;
}
</style>
