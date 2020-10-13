/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 13.10.2020
 * Description : Configurations des requêtes API pour les entrepriseDomaines
 * Fichier : entrepriseDomaineService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/entrepriseDomaines'

export default {
  postEntrepriseDomaine(entrepriseDomaine) {
    return axios.post(API_URL + CONTROLLER, entrepriseDomaine)
  },
  deleteEntrepriseDomaine(payload) {
    return axios.delete(
      API_URL +
        CONTROLLER +
        '/' +
        payload.entrepriseId +
        '/' +
        payload.domaineId
    )
  }
}
