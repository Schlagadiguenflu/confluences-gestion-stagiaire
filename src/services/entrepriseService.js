import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getEntreprises() {
    return axios.get(state.apiUrl + '/api/entreprise')
  },
  getEntreprisesWithFilter(filter) {
    let queryCharacter = '?'
    let query = ''
    if (filter.codePostal != null && filter.codePostal != '') {
      query += `${queryCharacter}codePostal=${filter.codePostal}`
      queryCharacter = '&'
    }
    if (filter.nom != null && filter.nom != '') {
      query += `${queryCharacter}nom=${filter.nom}`
      queryCharacter = '&'
    }
    if (filter.dateModification != null && filter.dateModification != '') {
      query += `${queryCharacter}dateModification=${filter.dateModification}`
      queryCharacter = '&'
    }
    if (filter.createur != null && filter.createur != '') {
      query += `${queryCharacter}createur=${filter.createur}`
      queryCharacter = '&'
    }
    if (queryCharacter == '?') {
      query += query + queryCharacter + 'temp=null'
      queryCharacter = '&'
    }
    query += `${filter.metiers
      .map(({ typeMetierId }) => queryCharacter + 'metiers=' + typeMetierId)
      .join('')}`
    if (filter.metiers.length > 0) {
      queryCharacter = '&'
    }
    query += `${filter.offres
      .map(({ typeOffreId }) => queryCharacter + 'offres=' + typeOffreId)
      .join('')}`
    if (filter.offres.length > 0) {
      queryCharacter = '&'
    }
    query += `${filter.domaines
      .map(({ typeDomaineId }) => queryCharacter + 'domaines=' + typeDomaineId)
      .join('')}`
    if (filter.domaines.length > 0) {
      queryCharacter = '&'
    }
    return axios.get(`${state.apiUrl}/api/entreprise${query}`)
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
