/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types d'entreprise
 * Fichier : typeEntrepriseService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeEntreprise'

export default {
  getTypeEntreprises() {
    return axios.get(API_URL + CONTROLLER)
  },
  getTypeEntreprise(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postTypeEntreprise(typeEntreprise) {
    return axios.post(API_URL + CONTROLLER, typeEntreprise)
  },
  putTypeEntreprise(typeEntreprise) {
    return axios.put(
      API_URL + CONTROLLER + '/' + typeEntreprise.typeEntrepriseId,
      typeEntreprise
    )
  },
  deleteTypeEntreprise(typeEntrepriseId) {
    return axios.delete(API_URL + CONTROLLER + '/' + typeEntrepriseId)
  }
}
