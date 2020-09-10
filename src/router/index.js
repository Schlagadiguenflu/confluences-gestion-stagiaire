import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EntreprisesList from '../views/EntreprisesList.vue'
import EntrepriseEdit from '../views/EntrepriseEdit.vue'
import StagesList from '../views/StagesList.vue'
import StageEdit from '../views/StageEdit.vue'
import StagiairesList from '../views/StagiairesList.vue'
import StagiaireEdit from '../views/StagiaireEdit.vue'
import ContactsList from '../views/ContactsList.vue'
import ContactEdit from '../views/ContactEdit.vue'
import MetiersList from '../views/MetiersList.vue'
import MetierEdit from '../views/MetierEdit.vue'
import Callback from '../views/Callback'
import NotFound from '../views/NotFound.vue'
import NProgress from 'nprogress'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/entreprises',
    name: 'Entreprises',
    component: EntreprisesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/entreprise/modifier/:id',
    name: 'Entreprise-Modifier',
    component: EntrepriseEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('entreprise/fetchEntreprise', routeTo.params.id)
        .then(entreprise => {
          routeTo.params.entreprise = entreprise
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'entreprise' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/stages',
    name: 'Stages',
    component: StagesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/stage/modifier/:id',
    name: 'Stage-Modifier',
    component: StageEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('stage/fetchStage', routeTo.params.id)
        .then(stage => {
          routeTo.params.stage = stage
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'stage' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/stagiaires',
    name: 'Stagiaires',
    component: StagiairesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/stagiaire/modifier/:id',
    name: 'Stagiaire-Modifier',
    component: StagiaireEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('stagiaire/fetchStagiaire', routeTo.params.id)
        .then(stagiaire => {
          routeTo.params.stagiaire = stagiaire
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'stagiaire' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ContactsList
  },
  {
    path: '/contact/modifier/:id',
    name: 'Contact-Modifier',
    component: ContactEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('contact/fetchContact', routeTo.params.id)
        .then(contact => {
          routeTo.params.contact = contact
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'contact' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/metiers',
    name: 'Metiers',
    component: MetiersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/metier/modifier/:id',
    name: 'TypeMetier-Modifier',
    component: MetierEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('typeMetier/fetchTypeMetier', routeTo.params.id)
        .then(typeMetier => {
          routeTo.params.typeMetier = typeMetier
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'metier' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authentification.user) {
      await store
        .dispatch('authentification/authenticate', to.path)
        .then(() => {})
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
