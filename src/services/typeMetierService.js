import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeMetiers() {
    return axios.get(state.apiUrl + '/api/TypeMetiers')
  }
}
