/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types d'offre
 * Fichier : typeOffreService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeOffres'

export default {
  getTypeOffres() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeOffre(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeOffre(typeOffre) {
    return axios.post(API_URL + CONTROLLER, typeOffre)
  },
  putTypeOffre(typeOffre) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeOffre.typeOffreId,
      typeOffre
    )
  },
  deleteTypeOffre(typeOffreId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeOffreId)
  }
}
