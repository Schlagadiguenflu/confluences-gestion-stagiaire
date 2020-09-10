import axios from 'axios'
import mgr from './security/SecurityService'
import { state } from '../store/modules/variables'

const baseUrl = state.apiUrl
var user = new mgr()

export default class ApiService {
  async defineHeaderAxios() {
    await user.getAcessToken().then(
      acessToken => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + acessToken
      },
      err => {
        console.log(err)
      }
    )
  }

  async getAll(api) {
    await this.defineHeaderAxios()
    return axios
      .get(baseUrl + api)
      .then(response => response.data)
      .catch(err => {
        console.log(err)
      })
  }
}
