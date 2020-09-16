/**
 * Projet: Gestion des stagiaires
 * Auteur : Tim Allemann
 * Date : 16.09.2020
 * Description : Fichier de configuration pour l'authentification
 * Fichier : index.js
 **/

import Oidc from 'oidc-client'
import axios from 'axios'

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),
  authority: process.env.VUE_APP_AUTHORITY_URL,
  client_id: 'gestion-stagiaire',
  redirect_uri: process.env.VUE_APP_APPLICATION_URL + '/callback',
  response_type: 'id_token token',
  scope: 'openid profile api1 roles',
  post_logout_redirect_uri: process.env.VUE_APP_APPLICATION_URL,
  silent_redirect_uri:
    process.env.VUE_APP_APPLICATION_URL + '/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
})

if (process.env.NODE_ENV == 'development') {
  Oidc.Log.logger = console
  Oidc.Log.level = Oidc.Log.INFO
}

// Evénement affichant l'utilisateur chargé
mgr.events.addUserLoaded(function(user) {
  if (process.env.NODE_ENV == 'development') {
    console.log('New User Loaded：', arguments)
    console.log('Access_token: ', user.access_token)
    console.log("User' role(s): ", user.profile.role)
  }
  // Ajoute le jeton d'accès dans l'entête
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
})

// Evénement affichant l'utilisateur chargé
mgr.events.addAccessTokenExpiring(function() {
  if (process.env.NODE_ENV == 'development') {
    console.log('AccessToken Expiring：', arguments)
  }
})

// Evénement alertant l'expiration du jeton d'accès
mgr.events.addAccessTokenExpired(function() {
  if (process.env.NODE_ENV == 'development') {
    console.log('AccessToken Expired：', arguments)
    console.log(mgr.getUser())
  }

  alert('La session est expirée! Vous allez être déconnecté.')
  mgr
    .signoutRedirect()
    .then(function(resp) {
      console.log('signed out', resp)
    })
    .catch(function(err) {
      console.log(err)
    })
})

// Evénement alertant un problème de rennouvellement du jeton d'accès
mgr.events.addSilentRenewError(function() {
  if (process.env.NODE_ENV == 'development') {
    console.error('Silent Renew Error：', arguments)
  }
})

// Evénement affichant l'utilisateur déconnecté
mgr.events.addUserSignedOut(function() {
  if (process.env.NODE_ENV == 'development') {
    console.log('UserSignedOut：', arguments)
  }
  mgr
    .signoutRedirect()
    .then(function(resp) {
      console.log('signed out', resp)
    })
    .catch(function(err) {
      console.log(err)
    })
})

export default class SecurityService {
  // Renouvelle le jeton d'accès manuellement
  renewToken() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .signinSilent()
        .then(function(user) {
          if (user == null) {
            self.signIn(null)
          } else {
            return resolve(user)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne l'utilisateur connecté
  getUser() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Vérifie si un utilisateur est connecté
  getSignedIn() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(false)
          } else {
            return resolve(true)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Redirige la fenêtre courante vers le service d'authentificaiton (login)
  signIn() {
    mgr.signinRedirect().catch(function(err) {
      console.log(err)
    })
  }

  // Redirige la fenêtre courante vers le service d'authentificaiton (logout)
  signOut(id_token) {
    console.log(id_token)
    if (id_token != null && id_token != undefined) {
      mgr
        .signoutRedirect({ id_token_hint: id_token })
        .then(function(resp) {
          console.log('signed out', resp)
        })
        .catch(function(err) {
          console.log(err)
        })
    } else {
      mgr
        .signoutRedirect()
        .then(function(resp) {
          console.log('signed out', resp)
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  }

  // Retourne le profil de l'utilisateur connecté
  getProfile() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.profile)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne le jeton d'identité
  getIdToken() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.id_token)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne l'état de la session
  getSessionState() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.session_state)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne le jeton d'accès
  getAcessToken() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.access_token)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne les ressources authorisé par l'utilisateur
  getScopes() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.scopes)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }

  // Retourne les rôles de l'utilisateur
  getRole() {
    let self = this
    return new Promise((resolve, reject) => {
      mgr
        .getUser()
        .then(function(user) {
          if (user == null) {
            self.signIn()
            return resolve(null)
          } else {
            return resolve(user.profile.role)
          }
        })
        .catch(function(err) {
          console.log(err)
          return reject(err)
        })
    })
  }
}
