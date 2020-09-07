import TypeAnnonceService from '@/services/typeAnnonceService.js'

export const namespaced = true

export const state = {
  typeAnnonces: []
}

export const mutations = {
  SET_TYPEANNONCES(state, typeAnnonces) {
    state.typeAnnonces = typeAnnonces
  }
}

export const actions = {
  fetchTypeAnnonces({ commit, dispatch }) {
    return TypeAnnonceService.getTypeAnnonces()
      .then(response => {
        commit('SET_TYPEANNONCES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Problème au chargement des types annonces : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
