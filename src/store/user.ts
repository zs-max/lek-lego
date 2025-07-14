import { Module } from "vuex";
import { GlobalDataProps } from "./index";

export interface UserProps {
  isLogin: boolean;
  userName?: string;
  data: { [key: string]: any };
  token: string;
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    isLogin: false,
    data: {},
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    login(state) {
      state.isLogin = true;
      state.userName = "viking";
    },
    logout(state) {
      state.isLogin = false;
    },
  },
  actions: {},
};

export default user;
