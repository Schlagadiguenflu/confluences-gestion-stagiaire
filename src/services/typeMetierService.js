/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types de métier
 * Fichier : typeMetierService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeMetiers'

export default {
  getTypeMetiers() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeMetier(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeMetier(typeMetier) {
    return axios.post(API_URL + CONTROLLER, typeMetier)
  },
  putTypeMetier(typeMetier) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeMetier.typeMetierId,
      typeMetier
    )
  },
  deleteTypeMetier(typeMetierId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeMetierId)
  }
}
