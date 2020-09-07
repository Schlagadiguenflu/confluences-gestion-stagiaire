import TypeStageService from '@/services/typeStageService.js'

export const namespaced = true

export const state = {
  typeStages: []
}

export const mutations = {
  SET_TYPESTAGES(state, typeStages) {
    state.typeStages = typeStages
  }
}

export const actions = {
  fetchTypeStages({ commit, dispatch }) {
    return TypeStageService.getTypeStages()
      .then(response => {
        commit('SET_TYPESTAGES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types stages : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
