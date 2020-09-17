/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les entrepriseOffres
 * Fichier : entrepriseOffreService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/EntrepriseOffres'

export default {
  postEntrepriseOffre(entrepriseOffre) {
    return axios.post(API_URL + CONTROLLER, entrepriseOffre)
  },
  deleteEntrepriseOffre(payload) {
    return axios.delete(
      API_URL + CONTROLLER + '/' + payload.entrepriseId + '/' + payload.offreId
    )
  }
}
