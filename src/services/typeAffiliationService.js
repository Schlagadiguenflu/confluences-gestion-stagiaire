/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types d'affiliation
 * Fichier : typeAffiliationService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeAffiliations'

export default {
  getTypeAffiliations() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeAffiliation(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeAffiliation(typeAffiliation) {
    return axios.post(API_URL + CONTROLLER, typeAffiliation)
  },
  putTypeAffiliation(typeAffiliation) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeAffiliation.typeAffiliationId,
      typeAffiliation
    )
  },
  deleteTypeAffiliation(typeAffiliationId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeAffiliationId)
  }
}
