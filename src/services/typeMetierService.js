import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getTypeMetiers() {
    return axios.get(state.apiUrl + '/api/TypeMetiers')
  },
  getTypeMetier(id) {
    return axios.get(state.apiUrl + '/api/TypeMetiers/' + id)
  },
  postTypeMetier(typeMetier) {
    return axios.post(state.apiUrl + '/api/TypeMetiers', typeMetier)
  },
  putTypeMetier(typeMetier) {
    return axios.put(
      state.apiUrl + '/api/TypeMetiers/' + typeMetier.typeMetierId,
      typeMetier
    )
  },
  deleteTypeMetier(typeMetierId) {
    return axios.delete(state.apiUrl + '/api/TypeMetiers/' + typeMetierId)
  }
}
