import TypeDomaineService from '@/services/typeDomaineService.js'

export const namespaced = true

export const state = {
  typeDomaines: []
}

export const mutations = {
  SET_TYPEDOMAINES(state, typeDomaines) {
    state.typeDomaines = typeDomaines
  }
}

export const actions = {
  fetchTypeDomaines({ commit, dispatch }) {
    return TypeDomaineService.getTypeDomaines()
      .then(response => {
        commit('SET_TYPEDOMAINES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Problème au chargement des types domaines : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
