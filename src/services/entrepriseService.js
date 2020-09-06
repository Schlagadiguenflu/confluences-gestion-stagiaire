import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
  getEntreprises() {
    return axios.get(state.apiUrl + '/api/entreprise')
  },
  getEntreprise(id) {
    return axios.get(state.apiUrl + '/api/entreprise/' + id)
  },
  postEntreprise(entreprise) {
    return axios.post(state.apiUrl + '/api/entreprise', entreprise)
  },
  putEntreprise(entreprise) {
    return axios.put(
      state.apiUrl + '/api/entreprise/' + entreprise.entrepriseId,
      entreprise
    )
  },
  deleteEntreprise(entrepriseId) {
    return axios.delete(state.apiUrl + '/api/entreprise/' + entrepriseId)
  }
}
