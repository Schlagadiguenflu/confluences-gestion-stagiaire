import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getStages() {
    return axios.get(state.apiUrl + '/api/stages')
  },
  getStage(id) {
    return axios.get(state.apiUrl + '/api/stages/' + id)
  },
  postStage(stage) {
    return axios.post(state.apiUrl + '/api/stages', stage)
  },
  putStage(stage) {
    return axios.put(state.apiUrl + '/api/stages/' + stage.stageId, stage)
  },
  deleteStage(stageId) {
    return axios.delete(state.apiUrl + '/api/stages/' + stageId)
  }
}
