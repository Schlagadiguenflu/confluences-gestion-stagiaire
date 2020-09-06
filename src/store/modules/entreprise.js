import EntrepriseService from '@/services/entrepriseService.js'

export const namespaced = true

export const state = {
  entreprises: [],
  entreprise: {},
  filter: {
    metiers: [],
    domaines: [],
    offres: [],
    codePostal: null,
    nom: null,
    dateModification: null,
    createur: null
  }
}

export const mutations = {
  SET_ENTREPRISES(state, entreprises) {
    state.entreprises = entreprises
  },
  SET_ENTREPRISE(state, entreprise) {
    state.entreprise = entreprise
  },
  ADD_ENTREPRISE(state, entrepriseNew) {
    state.entreprises.push({
      ...entrepriseNew
    })
  },
  DELETE_ENTREPRISE(state) {
    state.entreprise = null
  },
  SET_OFFRE_ENTREPRISE(state, offre) {
    state.entreprise.entrepriseOffres.push({
      ...offre
    })
  },
  DELETE_OFFRE_ENTREPRISE(state, offreId) {
    state.entreprise.entrepriseOffres = state.entreprise.entrepriseOffres.filter(
      entrepriseOffre => entrepriseOffre.typeOffreId !== offreId
    )
  },
  SET_METIER_ENTREPRISE(state, metier) {
    state.entreprise.entrepriseMetiers.push({
      ...metier
    })
  },
  EDIT_ENTREPRISE(state, entrepriseNew) {
    state.entreprises = state.entreprises.filter(
      entreprise => entreprise.entrepriseId !== entrepriseNew.entrepriseId
    )
    state.entreprises.push({
      ...entrepriseNew
    })
  },
  DELETE_METIER_ENTREPRISE(state, metierId) {
    state.entreprise.entrepriseMetiers = state.entreprise.entrepriseMetiers.filter(
      entrepriseMetier => entrepriseMetier.typeMetierId !== metierId
    )
  },
  SET_CONTACT(state, contact) {
    state.entreprise.contacts.push({
      ...contact
    })
  },
  DELETE_CONTACT(state, contactId) {
    state.entreprise.contacts = state.entreprise.contacts.filter(
      contact => contact.contactId !== contactId
    )
  },
  EDIT_CONTACT(state, contactNew) {
    state.entreprise.contacts = state.entreprise.contacts.filter(
      contact => contact.contactId !== contactNew.contactId
    )
    state.entreprise.contacts.push({
      ...contactNew
    })
  },
  ADD_FILTER_METIER_ENTREPRISE(state, metier) {
    state.filter.metiers.push({
      ...metier
    })
  },
  ADD_FILTER_OFFRE_ENTREPRISE(state, offre) {
    state.filter.offres.push({
      ...offre
    })
  },
  ADD_FILTER_DOMAINE_ENTREPRISE(state, domaine) {
    state.filter.domaines.push({
      ...domaine
    })
  },
  SAVE_FILTER_ENTREPRISE(state, filter) {
    state.filter = filter
  }
}

export const actions = {
  fetchEntreprises({ commit, dispatch }) {
    return EntrepriseService.getEntreprises()
      .then(response => {
        commit('SET_ENTREPRISES', response.data)
        const notification = {
          type: 'success',
          message: 'Entreprises chargées'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème entreprises : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEntreprise({ commit, dispatch }, id) {
    return EntrepriseService.getEntreprise(id)
      .then(response => {
        commit('SET_ENTREPRISE', response.data)
        const notification = {
          type: 'success',
          message: 'Entreprise chargée'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Il y un problème charger une entreprise ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  createEntreprise({ commit, dispatch }, entreprise) {
    return EntrepriseService.postEntreprise(entreprise)
      .then(response => {
        commit('ADD_ENTREPRISE', entreprise)
        commit('SET_ENTREPRISE', response.data)
        const notification = {
          type: 'success',
          message: 'Une entreprise a été ajoutée !'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = "L'entreprise existe déjà"
        } else {
          message = "Erreur à l'ajout d'une entreprise : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  editEntreprise({ commit, dispatch }, entreprise) {
    console.log(entreprise)
    return EntrepriseService.putEntreprise(entreprise)
      .then(() => {
        commit('EDIT_ENTREPRISE', entreprise)
        const notification = {
          type: 'success',
          message: 'Une entreprise a été modifiée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = "L'entreprise existe déjà"
        } else {
          message = "Erreur à l'ajout d'une entreprise : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteEntreprise({ commit, dispatch }, entrepriseId) {
    return EntrepriseService.deleteEntreprise(entrepriseId)
      .then(() => {
        commit('DELETE_ENTREPRISE')
        const notification = {
          type: 'success',
          message: 'Une entreprise a été supprimée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            "Problème de suppression d'une entreprise ! : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  addOffre({ commit }, offre) {
    commit('SET_OFFRE_ENTREPRISE', offre)
  },
  deleteOffre({ commit }, offreId) {
    commit('DELETE_OFFRE_ENTREPRISE', offreId)
  },
  addMetier({ commit }, offre) {
    commit('SET_METIER_ENTREPRISE', offre)
  },
  deleteMetier({ commit }, offreId) {
    commit('DELETE_METIER_ENTREPRISE', offreId)
  },
  addContact({ commit }, contact) {
    commit('SET_CONTACT', contact)
  },
  deleteContact({ commit }, contactId) {
    commit('DELETE_CONTACT', contactId)
  },
  editContact({ commit }, contact) {
    commit('EDIT_CONTACT', contact)
  },
  addFilterEntrepriseMetier({ commit }, metier) {
    commit('ADD_FILTER_METIER_ENTREPRISE', metier)
  },
  addFilterEntrepriseOffre({ commit }, offre) {
    commit('ADD_FILTER_OFFRE_ENTREPRISE', offre)
  },
  addFilterEntrepriseDomaine({ commit }, domaine) {
    commit('ADD_FILTER_DOMAINE_ENTREPRISE', domaine)
  },
  saveFilterEntreprise({ commit }, filter) {
    commit('SAVE_FILTER_ENTREPRISE', filter)
  }
}
