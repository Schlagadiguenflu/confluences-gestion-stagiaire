import ContactService from '@/services/contactService.js'

export const namespaced = true

export const state = {
  contact: {}
}

export const mutations = {
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
      })
  }
}
