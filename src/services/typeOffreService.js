import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeOffres() {
    return axios.get(state.apiUrl + '/api/TypeOffres')
  }
}
