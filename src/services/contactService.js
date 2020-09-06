import axios from 'axios'
import { state } from '../store/modules/variables'

export default {
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
