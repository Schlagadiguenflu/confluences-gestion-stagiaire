import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeOffres() {
    return axios.get(state.apiUrl + '/api/TypeOffres')
  }
}
