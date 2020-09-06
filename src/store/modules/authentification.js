import mgr from '@/security/index.js'
import axios from 'axios'

export const namespaced = true

export const state = {
  user: null,
  mgr: mgr
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
  CLEAR_USER_DATA() {
    localStorage.clear()
    location.reload()
    state.mgr.signoutRedirect({ id_token_hint: state.user.id_token })
  }
}

export const actions = {
  logout({ commit }) {
    commit('CLEAR_USER_DATA')
  },
  async authenticate({ commit }, returnPath) {
    console.log('is authenticating')
    const user = await actions.getUser() //see if the user details are in local storage
    if (user) {
      commit('SET_USER_DATA', user)
    } else {
      await actions.signIn(returnPath)
    }
  },
  async getUser() {
    console.log('gets user')
    try {
      let user = await state.mgr.getUser()
      return user
    } catch (err) {
      console.log(err)
    }
  },
  signIn(returnPath) {
    console.log('signs in')
    console.log(returnPath)
    returnPath
      ? state.mgr.signinRedirect({ state: returnPath })
      : state.mgr.signinRedirect()
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
