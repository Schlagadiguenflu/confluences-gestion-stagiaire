<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
      right
      color="primary"
      dark
    >
      <v-list nav>
        <v-list-item v-if="!loggedIn" @click="login">
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">
              Se connecter
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">
              Se déconnecter
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in getMenus"
          :key="link.label"
          link
          :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{
              link.label
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toggleTheme">
          <v-list-item-icon>
            <v-icon v-if="this.$vuetify.theme.dark"
              >mdi-toggle-switch-off</v-icon
            >
            <v-icon v-else>mdi-toggle-switch-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">
              Theme
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark elevate-on-scroll>
      <v-toolbar-title class="text-uppercase">{{ name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn
          v-for="link in getMenus"
          :key="`${link.label}-nav-link`"
          color:white
          text
          rounded
          class="my-2"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>
        <v-btn v-if="!loggedIn" text rounded @click="login" class="my-2"
          >Se connecter</v-btn
        >
        <v-btn v-else @click="logout" text rounded class="my-2">
          Se déconnecter
        </v-btn>
        <v-btn @click="toggleTheme" text rounded class="my-2">
          <v-icon v-if="this.$vuetify.theme.dark">mdi-toggle-switch-off</v-icon>
          <v-icon v-else>mdi-toggle-switch-outline</v-icon>
        </v-btn>
      </div>

      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
import { authComputed } from '../vuex/helpers'
export default {
  data() {
    return {
      name: 'Gestion des stagiaires',
      drawer: null,
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
          url: '/404',
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
      console.log(this.loggedIn)
      if (this.loggedIn) {
        return this.links
      } else {
        return this.links.filter(function(link) {
          return !link.loggedIn
        })
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('authentification/authenticate', this.$route.path)
        .then(() => {
          console.log('authenticating a protected url:' + this.$route.path)
          if (!this.$store.state.authentification.user) {
            console.log('error in authentification, see logs for more info')
          }
        })
    },
    logout() {
      this.$store.dispatch('authentification/logout')
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    toggleMenu() {
      this.drawer = true
    }
  }
}
</script>
