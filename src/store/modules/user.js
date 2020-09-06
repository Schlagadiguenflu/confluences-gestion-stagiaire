import UserService from '@/services/userService.js'

export const namespaced = true

export const state = {
  users: []
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  }
}

export const actions = {
  fetchUsers({ commit, dispatch }) {
    return UserService.getUsers()
      .then(response => {
        commit('SET_USERS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des utilisateurs : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
