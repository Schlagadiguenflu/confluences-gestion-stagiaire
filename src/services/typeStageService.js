import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeStages() {
    return axios.get(state.apiUrl + '/api/TypeStages')
  }
}
