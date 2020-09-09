import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeAffiliations() {
    return axios.get(state.apiUrl + '/api/TypeAffiliations')
  }
}
