import EntrepriseOffreService from '@/services/entrepriseOffreService.js'

export const namespaced = true

export const state = {
  entrepriseOffre: {}
}

export const mutations = {
  ADD_ENTREPRISEOFFRE(state, entrepriseOffre) {
    state.entrepriseOffre = entrepriseOffre
  }
}

export const actions = {
  createEntrepriseOffre({ commit, dispatch }, entrepriseOffre) {
    return EntrepriseOffreService.postEntrepriseOffre(entrepriseOffre)
      .then(() => {
        commit('ADD_ENTREPRISEOFFRE', entrepriseOffre)
        const notification = {
          type: 'success',
          message: 'Une offre a été ajoutée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = "L'offre existe déjà"
        } else {
          message = "Erreur à l'ajout d'une offre : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteEntrepriseOffre({ dispatch }, parameters) {
    return EntrepriseOffreService.deleteEntrepriseOffre(parameters)
      .then(() => {
        const notification = {
          type: 'success',
          message: 'Une offre a été supprimée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: "Problème de suppression d'une offre ! : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
