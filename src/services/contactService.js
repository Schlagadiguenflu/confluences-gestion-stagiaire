import axios from 'axios'
import { state } from '../store/modules/settings'

export default {
  getContacts() {
    return axios.get(state.apiUrl + '/api/Contacts')
  },
  getContact(id) {
    return axios.get(state.apiUrl + '/api/Contacts/' + id)
  },
  postContact(contact) {
    return axios.post(state.apiUrl + '/api/Contacts', contact)
  },
  putContact(contact) {
    return axios.put(
      state.apiUrl + '/api/Contacts/' + contact.contactId,
      contact
    )
  },
  deleteContact(contactId) {
    return axios.delete(state.apiUrl + '/api/Contacts/' + contactId)
  }
}
