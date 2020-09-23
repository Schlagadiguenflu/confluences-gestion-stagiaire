/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Fichier de configuration pour la navigation entre les vues
 * Fichier : index.js
 **/

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
import AffiliationsList from '../views/AffiliationsList.vue'
import AffiliationEdit from '../views/AffiliationEdit.vue'
import AnnoncesList from '../views/AnnoncesList.vue'
import AnnonceEdit from '../views/AnnonceEdit.vue'
import DomainesList from '../views/DomainesList.vue'
import DomaineEdit from '../views/DomaineEdit.vue'
import TypeEntreprisesList from '../views/TypeEntreprisesList.vue'
import TypeStagesList from '../views/TypeStagesList.vue'
import MoyensList from '../views/MoyensList.vue'
import MoyenEdit from '../views/MoyenEdit.vue'
import TypeOffresList from '../views/TypeOffresList.vue'
import Callback from '../views/Callback'
import NotFound from '../views/NotFound.vue'
import Unauthorized from '../views/Unauthorized.vue'
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
          if (entreprise == undefined) {
            next({ name: '404', params: { resource: 'entreprise' } })
          }
          routeTo.params.entreprise = entreprise
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'entreprise' } })
          } else {
            next(routeFrom)
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
          if (stage == undefined) {
            next({ name: '404', params: { resource: 'stage' } })
          }
          routeTo.params.stage = stage
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'stage' } })
          } else {
            next(routeFrom)
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
          if (stagiaire == undefined) {
            next({ name: '404', params: { resource: 'stagiaire' } })
          }
          routeTo.params.stagiaire = stagiaire
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'stagiaire' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ContactsList,
    meta: { requiresAuth: true }
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
          if (contact == undefined) {
            next({ name: '404', params: { resource: 'contact' } })
          }
          routeTo.params.contact = contact
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'contact' } })
          } else {
            next(routeFrom)
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
          if (typeMetier == undefined) {
            next({ name: '404', params: { resource: 'métier' } })
          }
          routeTo.params.typeMetier = typeMetier
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'metier' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/affiliations',
    name: 'Affiliations',
    component: AffiliationsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/affiliation/modifier/:id',
    name: 'TypeAffiliation-Modifier',
    component: AffiliationEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('typeAffiliation/fetchTypeAffiliation', routeTo.params.id)
        .then(typeAffiliation => {
          if (typeAffiliation == undefined) {
            next({ name: '404', params: { resource: 'affiliation' } })
          }
          routeTo.params.typeAffiliation = typeAffiliation
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'affiliation' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/annonces',
    name: 'Annonces',
    component: AnnoncesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/annonce/modifier/:id',
    name: 'TypeAnnonce-Modifier',
    component: AnnonceEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('typeAnnonce/fetchTypeAnnonce', routeTo.params.id)
        .then(typeAnnonce => {
          if (typeAnnonce == undefined) {
            next({ name: '404', params: { resource: 'annonce' } })
          }
          routeTo.params.typeAnnonce = typeAnnonce
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'annonce' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/domaines',
    name: 'Domaines',
    component: DomainesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/domaine/modifier/:id',
    name: 'TypeDomaine-Modifier',
    component: DomaineEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('typeDomaine/fetchTypeDomaine', routeTo.params.id)
        .then(typeDomaine => {
          if (typeDomaine == undefined) {
            next({ name: '404', params: { resource: 'domaine' } })
          }
          routeTo.params.typeDomaine = typeDomaine
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'domaine' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/typeentreprises',
    name: 'Type-Entreprises',
    component: TypeEntreprisesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/typestages',
    name: 'Type-Stages',
    component: TypeStagesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/moyens',
    name: 'Moyens',
    component: MoyensList,
    meta: { requiresAuth: true }
  },
  {
    path: '/moyen/modifier/:id',
    name: 'TypeMoyen-Modifier',
    component: MoyenEdit,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('typeMoyen/fetchTypeMoyen', routeTo.params.id)
        .then(typeMoyen => {
          if (typeMoyen == undefined) {
            next({ name: '404', params: { resource: 'moyen' } })
          }
          routeTo.params.typeMoyen = typeMoyen
          next()
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'moyen' } })
          } else {
            next(routeFrom)
          }
        })
    }
  },
  {
    path: '/offres',
    name: 'Offres',
    component: TypeOffresList,
    meta: { requiresAuth: true }
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
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
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

// Vérification si l'utilisateur détient le role Teacher (true/false)
function isTeacher() {
  let roles = store.state.authentification.user.profile.role
  let isTeacher = false
  if (roles != undefined) {
    if (roles == 'Teacher') {
      isTeacher = true
    }
    for (var i = 0; i < roles.length; i++) {
      if (roles[i] == 'Teacher') {
        isTeacher = true
      }
    }
  }
  return isTeacher
}

// Vérification de connexion de l'utilisateur, utile surtout si l'utilisateur rafraichit la page
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authentification.user) {
      await store
        .dispatch('authentification/authenticate', to.path)
        .then(() => {})
    }
    if (!isTeacher()) {
      next({ name: 'Unauthorized' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
