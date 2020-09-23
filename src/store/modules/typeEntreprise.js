/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage des entreprises
 * Fichier : typeEntreprise.js
 **/

import TypeEntrepriseService from '@/services/typeEntrepriseService.js'

export const namespaced = true

export const state = {
  typeEntreprises: []
}

export const mutations = {
  SET_TYPEENTREPRISES(state, typeEntreprises) {
    state.typeEntreprises = typeEntreprises
  }
}

export const actions = {
  // Récupère les types d'entreprise et notifie l'utilisateur en cas de succès ou erreur
  fetchTypeEntreprises({ commit, dispatch }, notify) {
    return TypeEntrepriseService.getTypeEntreprises()
      .then(response => {
        commit('SET_TYPEENTREPRISES', response.data)
        if (notify == true) {
          const notification = {
            type: 'success',
            message: "Types d'entreprises chargées"
          }
          dispatch('notification/add', notification, { root: true })
        }
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'Problème au chargement des types entreprises : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
