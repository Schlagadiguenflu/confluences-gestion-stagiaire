import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getTypeDomaines() {
    return axios.get(state.apiUrl + '/api/TypeDomaines')
  }
}
