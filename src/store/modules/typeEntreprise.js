import TypeEntrepriseService from '@/services/typeEntrepriseService.js'

export const namespaced = true

export const state = {
  typeEntreprises: []
}

export const mutations = {
  SET_TYPEENTREPRISES(state, typeEntreprises) {
    state.typeEntreprises = typeEntreprises
  }
}

export const actions = {
  fetchTypeEntreprises({ commit, dispatch }) {
    return TypeEntrepriseService.getTypeEntreprises()
      .then(response => {
        commit('SET_TYPEENTREPRISES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Problème au chargement des types entreprises : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
