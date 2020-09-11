import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeAnnonces() {
    return axios.get(state.apiUrl + '/api/TypeAnnonces')
  }
}
