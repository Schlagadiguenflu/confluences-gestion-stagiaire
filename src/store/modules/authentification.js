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
    localStorage.setItem('user', JSON.stringify(userData))
    axios.interceptors.request.use(
      config => {
        const user = state.user
        if (user) {
          const authToken = user.access_token
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`
          }
        }
        return config
      },
      err => {
        //What do you want to do when a call fails?
        console.log('Issue with access_token : ' + err)
      }
    )
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
    commit('SET_USER_DATA', user)
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
