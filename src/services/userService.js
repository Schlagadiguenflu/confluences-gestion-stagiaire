import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getUsers() {
    return axios.get(state.apiUrl + '/api/Users')
  }
}
