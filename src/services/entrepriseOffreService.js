import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  postEntrepriseOffre(entrepriseOffre) {
    return axios.post(state.apiUrl + '/api/EntrepriseOffres', entrepriseOffre)
  },
  deleteEntrepriseOffre(payload) {
    return axios.delete(
      state.apiUrl +
        '/api/EntrepriseOffres/' +
        payload.entrepriseId +
        '/' +
        payload.offreId
    )
  }
}
