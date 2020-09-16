/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Configurations des requêtes API pour les contacts
 * Fichier : contactService.js
 **/

import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL
const CONTROLLER = '/api/contacts'

export default {
  getContacts() {
    return axios.get(API_URL + CONTROLLER)
  },
  getContact(id) {
    return axios.get(API_URL + `${CONTROLLER}/${id}`)
  },
  postContact(contact) {
    return axios.post(API_URL + CONTROLLER, contact)
  },
  putContact(contact) {
    return axios.put(API_URL + `${CONTROLLER}/${contact.contactId}`, contact)
  },
  deleteContact(contactId) {
    return axios.delete(API_URL + `${CONTROLLER}/${contactId}`)
  }
}
