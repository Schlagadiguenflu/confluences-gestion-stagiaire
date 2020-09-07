<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in getMenus"
        :key="`${link.label}-footer-link`"
        color="white"
        text
        rounded
        class="my-2"
        :to="link.url"
      >
        {{ link.label }}
      </v-btn>
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
      name: 'Confluences - Gestion des stagiaires',
      links: [
        {
          label: 'Accueil',
          url: '/',
          icon: 'mdi-home',
          loggedIn: false
        },
        {
          label: 'Entreprises',
          url: '/entreprises',
          icon: 'mdi-office-building-outline',
          loggedIn: true
        },
        {
          label: 'Stages',
          url: '/stages',
          icon: 'mdi-briefcase-outline',
          loggedIn: true
        },
        {
          label: 'Stages par stagiaire',
          url: '/404',
          icon: 'mdi-account-hard-hat',
          loggedIn: true
        },
        {
          label: 'Contacts',
          url: '/404',
          icon: 'mdi-card-account-mail',
          loggedIn: true
        },
        {
          label: 'Métiers',
          url: '/404',
          icon: 'mdi-card-account-mail',
          loggedIn: true
        }
      ]
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

<style lang="scss" scoped></style>
