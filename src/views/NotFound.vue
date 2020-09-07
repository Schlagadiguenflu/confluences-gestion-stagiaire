<template>
  <v-container>
    <v-row class="mt-5">
      <v-col class="text-center" cols="12" tag="h1">
        <h2>Oups</h2>
        <h3>La ressource que vous cherchez n'existe pas</h3>
        <router-link :to="{ name: 'Home' }">Retourner à l'accueil </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: false
    }
  }
}
</script>
