import TypeMetierService from '@/services/typeMetierService.js'

export const namespaced = true

export const state = {
  typeMetiers: []
}

export const mutations = {
  SET_TYPEMETIERS(state, typeMetiers) {
    state.typeMetiers = typeMetiers
  }
}

export const actions = {
  fetchTypeMetiers({ commit, dispatch }) {
    return TypeMetierService.getTypeMetiers()
      .then(response => {
        commit('SET_TYPEMETIERS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types métiers : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
