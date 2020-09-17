/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types de stage
 * Fichier : typeStageService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeStages'

export default {
  getTypeStages() {
    return axios.get(API_URL + CONTROLLER)
  }
}
