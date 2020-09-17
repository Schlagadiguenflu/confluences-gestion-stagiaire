/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage des offres
 * Fichier : typeOffre.js
 **/

import TypeOffreService from '@/services/typeOffreService.js'

export const namespaced = true

export const state = {
  typeOffres: []
}

export const mutations = {
  SET_TYPEOFFRES(state, typeOffres) {
    state.typeOffres = typeOffres
  }
}

export const actions = {
  // Récupère les types d'offres et notifie l'utilisateur en cas de succès ou erreur
  fetchTypeOffres({ commit, dispatch }) {
    return TypeOffreService.getTypeOffres()
      .then(response => {
        commit('SET_TYPEOFFRES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème au chargement des types offres : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
