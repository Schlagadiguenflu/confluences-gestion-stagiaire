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
export default {
  async created() {
    try {
      var result = await this.$store.state.authentification.mgr.signinRedirectCallback()
      var returnToUrl = '/'
      if (result.state !== undefined) {
        returnToUrl = result.state
      }
      this.$store
        .dispatch('authentification/authenticate', this.$route.path)
        .then(() => {
          console.log('authenticating a protected url:' + this.$route.path)
          if (!this.$store.state.authentification.user) {
            console.log('error in authentification, see logs for more info')
          }
        })
      this.$router.push({ path: returnToUrl })
    } catch (e) {
      console.log(e)
      this.$router.push({ name: 'Unauthorized' })
    }
  }
}
</script>
