/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage des type de stages
 * Fichier : typeStage.js
 **/

import TypeStageService from '@/services/typeStageService.js'

export const namespaced = true

export const state = {
  typeStages: []
}

export const mutations = {
  SET_TYPESTAGES(state, typeStages) {
    state.typeStages = typeStages
  }
}

export const actions = {
  // Récupère les types de stage et notifie l'utilisateur en cas de succès ou erreur
  fetchTypeStages({ commit, dispatch }, notify) {
    return TypeStageService.getTypeStages()
      .then(response => {
        commit('SET_TYPESTAGES', response.data)
        if (notify == true) {
          const notification = {
            type: 'success',
            message: 'Types de stages chargés'
          }
          dispatch('notification/add', notification, { root: true })
        }
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types stages : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
