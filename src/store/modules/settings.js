export const namespaced = true

export const state = {
  authorityUrl: 'https://localhost:5000',
  applicationUrl: 'http://localhost:8080',
  apiUrl: 'http://localhost:5001',
  itemsPerPage: 10,
  currentPageEntreprise: 1,
  currentPageStage: 1,
  currentPageStagiaire: 1,
  currentPageContact: 1,
  currentPageTypeMetier: 1
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
  }
}

export const actions = {
  setItemsPerPage({ commit }, number) {
    commit('SET_ITEMSPERPAGE', number.number)
  },
  setCurrentPageEntreprise({ commit }, number) {
    commit('SET_CURRENTPAGEENTREPRISE', number.number)
  },
  setCurrentPageStage({ commit }, number) {
    commit('SET_CURRENTPAGESTAGE', number.number)
  },
  setCurrentPageStagiaire({ commit }, number) {
    commit('SET_CURRENTPAGESTAGIAIRE', number.number)
  },
  setCurrentPageContact({ commit }, number) {
    commit('SET_CURRENTPAGECONTACT', number.number)
  },
  setCurrentPageTypeMetier({ commit }, number) {
    commit('SET_CURRENTPAGETYPEMETIER', number.number)
  }
}
