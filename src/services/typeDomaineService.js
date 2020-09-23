/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types de domaine
 * Fichier : typeDomaineService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeDomaines'

export default {
  getTypeDomaines() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeDomaine(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeDomaine(typeDomaine) {
    return axios.post(API_URL + CONTROLLER, typeDomaine)
  },
  putTypeDomaine(typeDomaine) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeDomaine.typeDomaineId,
      typeDomaine
    )
  },
  deleteTypeDomaine(typeDomaineId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeDomaineId)
  }
}
