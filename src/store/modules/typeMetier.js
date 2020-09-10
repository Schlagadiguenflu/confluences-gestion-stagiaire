import TypeMetierService from '@/services/typeMetierService.js'

export const namespaced = true

export const state = {
  typeMetiers: [],
  typeMetier: {}
}

export const mutations = {
  SET_TYPEMETIERS(state, typeMetiers) {
    state.typeMetiers = typeMetiers
  },
  SET_TYPEMETIER(state, typeMetier) {
    state.typeMetier = typeMetier
  },
  ADD_TYPEMETIER(state, typeMetierNew) {
    state.typeMetiers.push({
      ...typeMetierNew
    })
  },
  EDIT_TYPEMETIER(state, typeMetierNew) {
    state.typeMetiers = state.typeMetiers.filter(
      typeMetier => typeMetier.typeMetierId !== typeMetierNew.typeMetierId
    )
    state.typeMetiers.push({
      ...typeMetierNew
    })
  },
  DELETE_TYPEMETIER(state) {
    state.typeMetier = null
  }
}

export const actions = {
  fetchTypeMetiers({ commit, dispatch }, notify) {
    return TypeMetierService.getTypeMetiers()
      .then(response => {
        commit('SET_TYPEMETIERS', response.data)
        if (notify == true) {
          const notification = {
            type: 'success',
            message: 'Métiers chargés'
          }
          dispatch('notification/add', notification, { root: true })
        }
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types métiers : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchTypeMetier({ commit, dispatch }, id) {
    return TypeMetierService.getTypeMetier(id)
      .then(response => {
        commit('SET_TYPEMETIER', response.data)
        const notification = {
          type: 'success',
          message: 'Métier chargé'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Il y un problème charger un métier ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  createTypeMetier({ commit, dispatch }, typeMetier) {
    return TypeMetierService.postTypeMetier(typeMetier)
      .then(response => {
        commit('ADD_TYPEMETIER', typeMetier)
        commit('SET_TYPEMETIER', response.data)
        const notification = {
          type: 'success',
          message: 'Un métier a été ajouté !'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
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
  editTypeMetier({ commit, dispatch }, typeMetier) {
    return TypeMetierService.putTypeMetier(typeMetier)
      .then(() => {
        commit('EDIT_TYPEMETIER', typeMetier)
        const notification = {
          type: 'success',
          message: 'Un métier a été modifié !'
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
  deleteTypeMetier({ commit, dispatch }, typeMetierId) {
    return TypeMetierService.deleteTypeMetier(typeMetierId)
      .then(() => {
        commit('DELETE_TYPEMETIER')
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
