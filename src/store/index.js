import Vue from 'vue'
import Vuex from 'vuex'
import * as variables from '@/store/modules/variables.js'
import * as notification from '@/store/modules/notification.js'
import * as authentification from '@/store/modules/authentification.js'
import * as entreprise from '@/store/modules/entreprise.js'
import * as entrepriseOffre from '@/store/modules/entrepriseOffre.js'
import * as entrepriseMetier from '@/store/modules/entrepriseMetier.js'
import * as typeEntreprise from '@/store/modules/typeEntreprise.js'
import * as typeDomaine from '@/store/modules/typeDomaine.js'
import * as typeOffre from '@/store/modules/typeOffre.js'
import * as typeMetier from '@/store/modules/typeMetier.js'
import * as contact from '@/store/modules/contact.js'
import * as user from '@/store/modules/user.js'
import * as stage from '@/store/modules/stage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    variables,
    notification,
    authentification,
    entreprise,
    entrepriseOffre,
    entrepriseMetier,
    typeEntreprise,
    typeDomaine,
    typeOffre,
    typeMetier,
    contact,
    user,
    stage
  }
})
