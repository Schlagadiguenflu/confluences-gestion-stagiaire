/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les types d'annonce
 * Fichier : typeAnnonceService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/TypeAnnonces'

export default {
  getTypeAnnonces() {
    return axios.get(API_URL + CONTROLLER)
  }
}
