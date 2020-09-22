/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types de moyens
 * Fichier : typeMoyenService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeMoyens'

export default {
  getTypeMoyens() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeMoyen(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeMoyen(typeMoyen) {
    return axios.post(API_URL + CONTROLLER, typeMoyen)
  },
  putTypeMoyen(typeMoyen) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeMoyen.typeMoyenId,
      typeMoyen
    )
  },
  deleteTypeMoyen(typeMoyenId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeMoyenId)
  }
}
