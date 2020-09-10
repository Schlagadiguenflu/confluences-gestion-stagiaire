import ContactService from '@/services/contactService.js'

export const namespaced = true

export const state = {
  contacts: [],
  contact: {}
}

export const mutations = {
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts
  },
  SET_CONTACT(state, contact) {
    state.contact = contact
  },
  ADD_CONTACT(state, contact) {
    state.contact = contact
  },
  EDIT_CONTACT(state, contact) {
    state.contact = contact
  },
  DELETE_CONTACT(state) {
    state.contact = null
  }
}

export const actions = {
  fetchContacts({ commit, dispatch }) {
    return ContactService.getContacts()
      .then(response => {
        commit('SET_CONTACTS', response.data)
        const notification = {
          type: 'success',
          message: 'Contacts chargés'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des contacts : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchContact({ commit, dispatch }, id) {
    return ContactService.getContact(id)
      .then(response => {
        commit('SET_CONTACT', response.data)
        const notification = {
          type: 'success',
          message: 'Contact chargé'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Il y un problème pour charger un contact ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  createContact({ commit, dispatch }, contact) {
    return ContactService.postContact(contact)
      .then(response => {
        commit('ADD_CONTACT', response.data)
        const notification = {
          type: 'success',
          message: 'Un contact a été ajoutée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = 'Le contact existe déjà'
        } else {
          message = "Erreur à l'ajout d'un contact : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  editContact({ commit, dispatch }, contact) {
    return ContactService.putContact(contact)
      .then(() => {
        commit('EDIT_CONTACT', contact)
        const notification = {
          type: 'success',
          message: 'Un contact a été modifié !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = 'Le contact existe déjà'
        } else {
          message = "Erreur à l'ajout d'un contact : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteContact({ commit, dispatch }, contactId) {
    return ContactService.deleteContact(contactId.contactId)
      .then(() => {
        commit('DELETE_CONTACT')
        const notification = {
          type: 'success',
          message: 'Un contact a été supprimé !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: "Problème de suppression d'un contact ! : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}
