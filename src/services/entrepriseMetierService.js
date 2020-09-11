import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  postEntrepriseMetier(entrepriseMetier) {
    return axios.post(state.apiUrl + '/api/EntrepriseMetiers', entrepriseMetier)
  },
  deleteEntrepriseMetier(payload) {
    return axios.delete(
      state.apiUrl +
        '/api/EntrepriseMetiers/' +
        payload.entrepriseId +
        '/' +
        payload.metierId
    )
  }
}
