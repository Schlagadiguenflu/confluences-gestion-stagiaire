export const namespaced = true

export const state = {
  authorityUrl: 'https://confluences-id4.nnamella.ch',
  applicationUrl: 'https://administration-confluences.ch',
  apiUrl: 'https://confluences-api.nnamella.ch',
  itemsPerPage: 10
}

export const mutations = {
  SET_ITEMSPERPAGE(state, number) {
    state.itemsPerPage = number
  }
}

export const actions = {
  setItemsPerPage({ commit }, number) {
    commit('SET_ITEMSPERPAGE', number.number)
  }
}
