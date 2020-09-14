import Oidc from 'oidc-client'
import { state } from '../store/modules/settings'
import axios from 'axios'

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore(),
  authority: state.authorityUrl,
  client_id: 'gestion-stagiaire',
  redirect_uri: state.applicationUrl + '/callback',
  response_type: 'id_token token',
  scope: 'openid profile api1 roles',
  post_logout_redirect_uri: state.applicationUrl,
  silent_redirect_uri: state.applicationUrl + '/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
})

if (process.env.NODE_ENV == 'development') {
  Oidc.Log.logger = console
  Oidc.Log.level = Oidc.Log.INFO
}

mgr.events.addUserLoaded(function(user) {
  if (process.env.NODE_ENV == 'development') {
    console.log('New User Loaded：', arguments)
    console.log('Access_token: ', user.access_token)
  }

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
})

mgr.events.addAccessTokenExpiring(function() {
  if (process.env.NODE_ENV == 'development') {
    console.log('AccessToken Expiring：', arguments)
  }
})

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

mgr.events.addSilentRenewError(function() {
  if (process.env.NODE_ENV == 'development') {
    console.error('Silent Renew Error：', arguments)
  }
})

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
  // Renew the token manually
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

  // Get the user who is logged in
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

  // Check if there is any user logged in
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

  // Redirect of the current window to the authorization endpoint.
  signIn() {
    mgr.signinRedirect().catch(function(err) {
      console.log(err)
    })
  }

  // Redirect of the current window to the end session endpoint
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

  // Get the profile of the user logged in
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

  // Get the token id
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

  // Get the session state
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

  // Get the access token of the logged in user
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

  // Takes the scopes of the logged in user
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

  // Get the user roles logged in
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
