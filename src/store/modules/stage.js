import StageService from '@/services/stageService.js'

export const namespaced = true

export const state = {
  stages: []
}

export const mutations = {
  SET_STAGES(state, stages) {
    state.stages = stages
  }
}

export const actions = {
  fetchStages({ commit, dispatch }) {
    return StageService.getStages()
      .then(response => {
        commit('SET_STAGES', response.data)
        const notification = {
          type: 'success',
          message: 'Stages chargés'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Problème stages : ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
