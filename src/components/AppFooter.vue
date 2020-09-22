<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Footer de l'application
  -- Fichier : AppFooter.vue
  -->

<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>{{ name }}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { authComputed } from '../vuex/helpers'
export default {
  data() {
    return {
      name: 'Confluences - Gestion des stagiaires'
    }
  },
  computed: {
    ...authComputed,
    getMenus: function() {
      if (this.loggedIn) {
        return this.links
      } else {
        return this.links.filter(function(link) {
          return !link.loggedIn
        })
      }
    }
  }
}
</script>
