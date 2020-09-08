import StageService from '@/services/stageService.js'

export const namespaced = true

export const state = {
  stages: [],
  stage: {}
}

export const mutations = {
  SET_STAGES(state, stages) {
    state.stages = stages
  },
  SET_STAGE(state, stage) {
    state.stage = stage
  },
  ADD_STAGE(state, stage) {
    state.stages.push({
      ...stage
    })
  },
  EDIT_STAGE(state, stageNew) {
    state.stages = state.stages.filter(
      stage => stage.stageId !== stageNew.stageId
    )
    state.stages.push({
      ...stageNew
    })
  },
  DELETE_STAGE(state) {
    state.stage = null
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
  },
  fetchStage({ commit, dispatch }, id) {
    return StageService.getStage(id)
      .then(response => {
        commit('SET_STAGE', response.data)
        const notification = {
          type: 'success',
          message: 'Stage chargé'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'Il y un problème charger un stage ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  createStage({ commit, dispatch }, stage) {
    return StageService.postStage(stage)
      .then(response => {
        commit('ADD_STAGE', stage)
        commit('SET_STAGE', response.data)
        const notification = {
          type: 'success',
          message: 'Un stage a été ajouté !'
        }
        dispatch('notification/add', notification, { root: true })
        return response.data
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = 'Le stage existe déjà'
        } else {
          message = "Erreur à l'ajout d'un stage : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  editStage({ commit, dispatch }, stage) {
    return StageService.putStage(stage)
      .then(() => {
        commit('EDIT_STAGE', stage)
        const notification = {
          type: 'success',
          message: 'Un stage a été modifié !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        let message = ''
        if (error.response && error.response.status == 409) {
          message = 'Le stage existe déjà'
        } else {
          message = "Erreur à l'ajout d'un stage : " + error.message
        }
        const notification = {
          type: 'error',
          message: message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  deleteStage({ commit, dispatch }, stageId) {
    return StageService.deleteStage(stageId)
      .then(() => {
        commit('DELETE_STAGE')
        const notification = {
          type: 'success',
          message: 'Un stage a été supprimée !'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: "Problème de suppression d'un stage ! : " + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
