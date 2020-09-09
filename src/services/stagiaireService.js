import axios from 'axios'
import { state } from '../store/modules/variables'

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
  }
}
