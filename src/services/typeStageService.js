import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeStages() {
    return axios.get(state.apiUrl + '/api/TypeStages')
  }
}
