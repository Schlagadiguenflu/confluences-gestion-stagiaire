/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage des moyens
 * Fichier : typeMoyen.js
 **/

import TypeMoyenService from '@/services/typeMoyenService.js'

export const namespaced = true

export const state = {
  typeMoyens: []
}

export const mutations = {
  SET_TYPEMOYENS(state, typeMoyens) {
    state.typeMoyens = typeMoyens
  }
}

export const actions = {
  // Récupère les types de moyens et notifie l'utilisateur en cas de succès ou erreur
  fetchTypeMoyens({ commit, dispatch }) {
    return TypeMoyenService.getTypeMoyens()
      .then(response => {
        commit('SET_TYPEMOYENS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types moyens : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
