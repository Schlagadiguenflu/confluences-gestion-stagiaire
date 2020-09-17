/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les stages
 * Fichier : stageService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/stages'

export default {
  getStages() {
    return axios.get(API_URL + CONTROLLER)
  },
  getStage(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postStage(stage) {
    return axios.post(API_URL + CONTROLLER, stage)
  },
  putStage(stage) {
    return axios.put(API_URL + CONTROLLER + '/' + stage.stageId, stage)
  },
  deleteStage(stageId) {
    return axios.delete(API_URL + CONTROLLER + '/' + stageId)
  }
}
