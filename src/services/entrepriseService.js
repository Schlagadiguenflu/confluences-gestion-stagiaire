/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les entreprises
 * Fichier : entrepriseService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/entreprise'

export default {
  getEntreprises() {
    return axios.get(API_URL + CONTROLLER)
  },
  getEntreprisesWithFilter(filter) {
    let query = this.getQuery(filter)
    return axios.get(API_URL + CONTROLLER + query)
  },
  getEntreprise(id) {
    return axios.get(API_URL + CONTROLLER + '/' + id)
  },
  postEntreprise(entreprise) {
    return axios.post(API_URL + CONTROLLER, entreprise)
  },
  putEntreprise(entreprise) {
    return axios.put(
      API_URL + CONTROLLER + '/' + entreprise.entrepriseId,
      entreprise
    )
  },
  deleteEntreprise(entrepriseId) {
    return axios.delete(API_URL + CONTROLLER + '/' + entrepriseId)
  },
  // Permet de retourner les paramètres pour la requête permettant de filtrer les entreprises
  getQuery(filter) {
    let queryCharacter = '?'
    let query = ''
    if (filter.codePostal != null && filter.codePostal != '') {
      query += `${queryCharacter}codePostal=${filter.codePostal}`
      queryCharacter = '&'
    }
    if (filter.nom != null && filter.nom != '') {
      query += `${queryCharacter}nom=${filter.nom}`
      queryCharacter = '&'
    }
    if (filter.dateModification != null && filter.dateModification != '') {
      query += `${queryCharacter}dateModification=${filter.dateModification}`
      queryCharacter = '&'
    }
    if (filter.createur != null && filter.createur != '') {
      query += `${queryCharacter}createur=${filter.createur}`
      queryCharacter = '&'
    }
    if (queryCharacter == '?') {
      query += query + queryCharacter + 'temp=null'
      queryCharacter = '&'
    }
    query += `${filter.metiers
      .map(({ typeMetierId }) => queryCharacter + 'metiers=' + typeMetierId)
      .join('')}`
    if (filter.metiers.length > 0) {
      queryCharacter = '&'
    }
    query += `${filter.offres
      .map(({ typeOffreId }) => queryCharacter + 'offres=' + typeOffreId)
      .join('')}`
    if (filter.offres.length > 0) {
      queryCharacter = '&'
    }
    query += `${filter.domaines
      .map(({ typeDomaineId }) => queryCharacter + 'domaines=' + typeDomaineId)
      .join('')}`
    if (filter.domaines.length > 0) {
      queryCharacter = '&'
    }
    return query
  }
}
