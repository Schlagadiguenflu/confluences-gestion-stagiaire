import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeEntreprises() {
    return axios.get(state.apiUrl + '/api/TypeEntreprise')
  }
}
