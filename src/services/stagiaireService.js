/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les stagiaires
 * Fichier : stagiaireService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/stagiaires'

export default {
  getStagiaires() {
    return axios.get(API_URL + CONTROLLER)
  },
  getStagiaire(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  putStagiaire(stagiaire) {
    return axios.put(
      API_URL + CONTROLLER + '/' + stagiaire.stagiaireId,
      stagiaire
    )
  },
  deleteStagiaire(stagiaireId) {
    return axios.delete(API_URL + CONTROLLER + '/' + stagiaireId)
  }
}
