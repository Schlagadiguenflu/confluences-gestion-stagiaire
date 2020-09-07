import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EntreprisesList from '../views/EntreprisesList.vue'
import EntrepriseEdit from '../views/EntrepriseEdit.vue'
import StagesList from '../views/StagesList.vue'
import StageEdit from '../views/StageEdit.vue'
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
    component: EntreprisesList
  },
  {
    path: '/entreprise/modifier/:id',
    name: 'Entreprise-Modifier',
    component: EntrepriseEdit,
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
    component: StagesList
  },
  {
    path: '/stage/modifier/:id',
    name: 'Stage-Modifier',
    component: StageEdit,
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

router.beforeEach((to, from, next) => {
  NProgress.start()
  const loggedIn = localStorage.getItem('user')
  if (loggedIn && !store.state.authentification.user) {
    store.dispatch('authentification/authenticate', to.path).then(() => {
      console.log('authenticating a protected url:' + to.path)
      if (!store.state.authentification.user) {
        console.log('error in authentification, see logs for more info')
      } else {
        next()
      }
    })
  }
  if (to.matched.some(record => record.meta.requiresAuth) && loggedIn == null) {
    next('/')
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
