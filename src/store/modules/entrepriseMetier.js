import EntrepriseMetierService from '@/services/entrepriseMetierService.js'

export const namespaced = true

export const state = {
  entrepriseMetier: {}
}

export const mutations = {
  ADD_ENTREPRISEMETIER(state, entrepriseMetier) {
    state.entrepriseMETIER = entrepriseMetier
  }
}

export const actions = {
  createEntrepriseMetier({ commit, dispatch }, entrepriseMetier) {
    return EntrepriseMetierService.postEntrepriseMetier(entrepriseMetier)
      .then(() => {
        commit('ADD_ENTREPRISEMETIER', entrepriseMetier)
        const notification = {
          type: 'success',
          message: 'Un métier a été ajoutée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = 'Le métier existe déjà'
        } else {
          message = "Erreur à l'ajout d'un métier : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteEntrepriseMetier({ dispatch }, parameters) {
    return EntrepriseMetierService.deleteEntrepriseMetier(parameters)
      .then(() => {
        const notification = {
          type: 'success',
          message: 'Un métier a été supprimé !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: "Problème de suppression d'un métier ! : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
