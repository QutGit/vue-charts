import "../digital";
import { getUser } from "../../utils/apis";

const state = {
  userInfo: {}
}
const mutations = {
  USER_LOGIN: (state, info) =>{
    state.userInfo = info;
  },
  USER_INFO: (state, info) =>{
    state.userInfo = info;
  }
}
const actions = {
  loginInfo({commit}, info){
    commit("USER_LOGIN",info)
  },
  getUserInfo({commit}){
    let self = this;
    return new Promise((resolve, reject) =>{
      getUser({isWrap: true}).then((result) =>{
        if(result.status === 200){
          let userInfo = result.data;
          commit("USER_INFO", userInfo);
          resolve(result)
        }
      });
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}