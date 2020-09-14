import SecurityService from '@/security/index'
import axios from 'axios'

export const namespaced = true

var mgr = new SecurityService()

export const state = {
  user: null
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
  },
  CLEAR_USER_DATA() {}
}

export const actions = {
  async logout({ commit }) {
    mgr.signOut(state.user.id_token)
    commit('CLEAR_USER_DATA')
  },
  async authenticate({ commit }) {
    const user = await mgr.getUser() //see if the user details are in local storage
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + user.access_token
    commit('SET_USER_DATA', user)
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
