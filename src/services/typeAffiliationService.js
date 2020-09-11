import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeAffiliations() {
    return axios.get(state.apiUrl + '/api/TypeAffiliations')
  }
}
