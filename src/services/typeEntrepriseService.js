import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeEntreprises() {
    return axios.get(state.apiUrl + '/api/TypeEntreprise')
  }
}
