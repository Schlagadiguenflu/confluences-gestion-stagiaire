/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configuration générale
 * Fichier : settings.js
 **/

export const namespaced = true

export const state = {
  authorityUrl: process.env.VUE_APP_AUTHORITY_URL,
  applicationUrl: process.env.VUE_APP_APPLICATION_URL,
  apiUrl: process.env.VUE_APP_API_URL,
  itemsPerPage: 10,
  currentPageEntreprise: 1,
  currentPageStage: 1,
  currentPageStagiaire: 1,
  currentPageContact: 1,
  currentPageTypeMetier: 1,
  currentPageTypeAffiliation: 1,
  currentPageTypeAnnonce: 1,
  currentPageTypeDomaine: 1,
  currentPageTypeEntreprise: 1,
  currentPageTypeMoyen: 1,
  currentPageTypeOffre: 1
}

export const mutations = {
  SET_ITEMSPERPAGE(state, number) {
    state.itemsPerPage = number
  },
  SET_CURRENTPAGEENTREPRISE(state, number) {
    state.currentPageEntreprise = number
  },
  SET_CURRENTPAGESTAGE(state, number) {
    state.currentPageStage = number
  },
  SET_CURRENTPAGESTAGIAIRE(state, number) {
    state.currentPageStagiaire = number
  },
  SET_CURRENTPAGECONTACT(state, number) {
    state.currentPageContact = number
  },
  SET_CURRENTPAGETYPEMETIER(state, number) {
    state.currentPageTypeMetier = number
  },
  SET_CURRENTPAGETYPEAFFILIATION(state, number) {
    state.currentPageTypeAffiliation = number
  },
  SET_CURRENTPAGETYPEANNONCE(state, number) {
    state.currentPageTypeAnnonce = number
  },
  SET_CURRENTPAGETYPEDOMAINE(state, number) {
    state.currentPageTypeDomaine = number
  },
  SET_CURRENTPAGETYPEENTREPRISE(state, number) {
    state.currentPageTypeEntreprise = number
  },
  SET_CURRENTPAGETYPEMOYEN(state, number) {
    state.currentPageTypeMoyen = number
  },
  SET_CURRENTPAGETYPEOFFRE(state, number) {
    state.currentPageTypeOffre = number
  }
}

export const actions = {
  // Affecte le nombre d'élément à afficher dans un tableau
  setItemsPerPage({ commit }, number) {
    commit('SET_ITEMSPERPAGE', number.number)
  },
  // Affecte le numéro de page consulté du tableau d'entreprises
  setCurrentPageEntreprise({ commit }, number) {
    commit('SET_CURRENTPAGEENTREPRISE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des stages
  setCurrentPageStage({ commit }, number) {
    commit('SET_CURRENTPAGESTAGE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des stagiaires
  setCurrentPageStagiaire({ commit }, number) {
    commit('SET_CURRENTPAGESTAGIAIRE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des contacts
  setCurrentPageContact({ commit }, number) {
    commit('SET_CURRENTPAGECONTACT', number.number)
  },
  // Affecte le numéro de page consulté du tableau des métiers
  setCurrentPageTypeMetier({ commit }, number) {
    commit('SET_CURRENTPAGETYPEMETIER', number.number)
  },
  // Affecte le numéro de page consulté du tableau des affiliations
  setCurrentPageTypeAffiliation({ commit }, number) {
    commit('SET_CURRENTPAGETYPEAFFILIATION', number.number)
  },
  // Affecte le numéro de page consulté du tableau des annonces
  setCurrentPageTypeAnnonce({ commit }, number) {
    commit('SET_CURRENTPAGETYPEANNONCE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des domaines
  setCurrentPageTypeDomaine({ commit }, number) {
    commit('SET_CURRENTPAGETYPEDOMAINE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des types d'entreprises
  setCurrentPageTypeEntreprise({ commit }, number) {
    commit('SET_CURRENTPAGETYPEENTREPRISE', number.number)
  },
  // Affecte le numéro de page consulté du tableau des types de moyens
  setCurrentPageTypeMoyen({ commit }, number) {
    commit('SET_CURRENTPAGETYPEMOYEN', number.number)
  },
  // Affecte le numéro de page consulté du tableau des types d'offre
  setCurrentPageTypeOffre({ commit }, number) {
    commit('SET_CURRENTPAGETYPEOFFRE', number.number)
  }
}
