<template>
  <v-container>
    <v-row class="mt-5">
      <v-col class="text-center" cols="12">
        <h2>Connexion en cours...</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Oidc from 'oidc-client'

export default {
  async created() {
    var mgr = new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore(),
      loadUserInfo: true,
      filterProtocolClaims: true
    })
    try {
      var result = await mgr.signinRedirectCallback()
      var returnToUrl = '/'
      if (result.state !== undefined) {
        returnToUrl = result.state
      }
      await this.$store
        .dispatch('authentification/authenticate', this.$route.path)
        .then(() => {})
      this.$router.push({ path: returnToUrl })
    } catch (e) {
      console.log(e)
      this.$router.push({ name: 'Unauthorized' })
    }
  }
}
</script>
