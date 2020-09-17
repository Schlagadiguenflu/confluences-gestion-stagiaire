/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage des domaines
 * Fichier : typeDomaine.js
 **/

import TypeDomaineService from '@/services/typeDomaineService.js'

export const namespaced = true

export const state = {
  typeDomaines: []
}

export const mutations = {
  SET_TYPEDOMAINES(state, typeDomaines) {
    state.typeDomaines = typeDomaines
  }
}

export const actions = {
  // Récupère les domaines et notifie l'utilisateur en cas de succès ou erreur
  fetchTypeDomaines({ commit, dispatch }) {
    return TypeDomaineService.getTypeDomaines()
      .then(response => {
        commit('SET_TYPEDOMAINES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Problème au chargement des types domaines : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
