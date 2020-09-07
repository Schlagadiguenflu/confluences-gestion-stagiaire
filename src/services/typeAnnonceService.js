import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeAnnonces() {
    return axios.get(state.apiUrl + '/api/TypeAnnonces')
  }
}
