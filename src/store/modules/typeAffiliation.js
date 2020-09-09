import TypeAffiliationService from '@/services/typeAffiliationService.js'

export const namespaced = true

export const state = {
  typeAffiliations: []
}

export const mutations = {
  SET_TYPEAFFILIATIONS(state, typeAffiliations) {
    state.typeAffiliations = typeAffiliations
  }
}

export const actions = {
  fetchTypeAffiliations({ commit, dispatch }) {
    return TypeAffiliationService.getTypeAffiliations()
      .then(response => {
        commit('SET_TYPEAFFILIATIONS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            "Problème au chargement des types d'affiliations : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
