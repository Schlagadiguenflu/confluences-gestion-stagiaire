import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeDomaines() {
    return axios.get(state.apiUrl + '/api/TypeDomaines')
  }
}
