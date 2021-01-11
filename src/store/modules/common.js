const state = {
  checkDtype: "",
  checkQtype: "",
  checkMonth: "",
  checkMonthS: ""
}

const mutations = {
  SET_DTTYPE: (state, routes) =>{
    state.routes = routes;
    state.checkDtype = routes;
  },
  SET_QTYPE: (state, type) =>{
    state.checkQtype = type;
  },
  SET_MONTH: (state, type) =>{
    state.checkMonth = type;
  },
  SET_MONTHS: (state, date) =>{
    state.checkMonthS = date;
  },
}
const actions = {
  setDtType({commit}, type){
    commit('SET_DTTYPE',type)
  },
  setQtype({commit}, type){
    commit('SET_QTYPE',type)
  },
  setMonth({commit}, date){
    commit('SET_MONTH',date)
  },
  setMonthS({commit}, date){
    commit('SET_MONTHS',date)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}