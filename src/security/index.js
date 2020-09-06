import Oidc from 'oidc-client'
import { state } from '../store/modules/variables'

var mgr = new Oidc.UserManager({
  authority: state.authorityUrl,
  client_id: 'js',
  redirect_uri: state.applicationUrl + '/callback',
  response_type: 'id_token token',
  scope: 'openid profile api1 roles',
  post_logout_redirect_uri: state.applicationUrl,
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  silent_redirect_uri: state.applicationUrl + '/static/silent-renew.html',
  accessTokenExpiringNotificationTime: 10
})

export default mgr
