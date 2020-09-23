/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les entrepriseMetiers
 * Fichier : entrepriseMetierService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/entrepriseMetiers'

export default {
  postEntrepriseMetier(entrepriseMetier) {
    return axios.post(API_URL + CONTROLLER, entrepriseMetier)
  },
  deleteEntrepriseMetier(payload) {
    return axios.delete(
      API_URL + CONTROLLER + '/' + payload.entrepriseId + '/' + payload.metierId
    )
  }
}
