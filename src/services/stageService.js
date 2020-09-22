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
  getStagesWithFilter(filter) {
    let query = this.getQuery(filter)
    return axios.get(API_URL + CONTROLLER + query)
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
  },
  // Permet de retourner les paramètres pour la requête permettant de filtrer les entreprises
  getQuery(filter) {
    let queryCharacter = '?'
    let query = ''
    if (filter.nom != null && filter.nom != '') {
      query += `${queryCharacter}nom=${filter.nom}`
      queryCharacter = '&'
    }
    if (filter.typeMetierId != null && filter.typeMetierId != '') {
      query += `${queryCharacter}typeMetierId=${filter.typeMetierId}`
      queryCharacter = '&'
    }
    if (filter.entrepriseId != null && filter.entrepriseId != '') {
      query += `${queryCharacter}entrepriseId=${filter.entrepriseId}`
      queryCharacter = '&'
    }
    if (filter.stagiaireId != null && filter.stagiaireId != '') {
      query += `${queryCharacter}stagiaireId=${filter.stagiaireId}`
      queryCharacter = '&'
    }
    if (filter.dateDebut != null && filter.dateDebut != '') {
      query += `${queryCharacter}dateDebut=${filter.dateDebut}`
      queryCharacter = '&'
    }
    if (filter.dateFin != null && filter.dateFin != '') {
      query += `${queryCharacter}dateFin=${filter.dateFin}`
      queryCharacter = '&'
    }
    if (filter.typeStageId != null && filter.typeStageId != '') {
      query += `${queryCharacter}typeStageId=${filter.typeStageId}`
      queryCharacter = '&'
    }
    if (filter.typeAnnonceId != null && filter.typeAnnonceId != '') {
      query += `${queryCharacter}typeAnnonceId=${filter.typeAnnonceId}`
      queryCharacter = '&'
    }
    return query
  }
}
