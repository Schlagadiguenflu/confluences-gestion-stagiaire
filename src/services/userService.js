import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getUsers() {
    return axios.get(state.apiUrl + '/api/Users')
  }
}
