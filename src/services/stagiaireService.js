import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getStagiaires() {
    return axios.get(state.apiUrl + '/api/stagiaires')
  },
  getStagiaire(id) {
    return axios.get(state.apiUrl + '/api/stagiaires/' + id)
  },
  putStagiaire(stagiaire) {
    return axios.put(
      state.apiUrl + '/api/stagiaires/' + stagiaire.stagiaireId,
      stagiaire
    )
  },
  deleteStagiaire(stagiaireId) {
    return axios.delete(state.apiUrl + '/api/stagiaires/' + stagiaireId)
  }
}
