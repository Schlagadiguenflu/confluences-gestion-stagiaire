export const namespaced = true

export const state = {
  authorityUrl: 'http://localhost:5000',
  applicationUrl: 'http://localhost:8080',
  apiUrl: 'http://localhost:5001',
  itemsPerPage: 10,
  currentPageEntreprise: 1,
  currentPageStage: 1,
  currentPageStagiaire: 1
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
  }
}
