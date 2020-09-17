/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Gestion et stockage de l'authentification
 * Fichier : authentification.js
 **/

import SecurityService from '@/security/index'
import axios from 'axios'

export const namespaced = true

var mgr = new SecurityService()

export const state = {
  user: null
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
  },
  CLEAR_USER_DATA() {}
}

export const actions = {
  // Déconnecte l'utilisateur et averti le serveur d'authentification
  async logout({ commit }) {
    mgr.signOut(state.user.id_token)
    commit('CLEAR_USER_DATA')
  },
  // Authentifie l'utilisateur
  async authenticate({ commit }) {
    const user = await mgr.getUser()
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + user.access_token
    commit('SET_USER_DATA', user)
  }
}

export const getters = {
  // Indique si l'utilisateur est connecté
  loggedIn(state) {
    return !!state.user
  }
}
