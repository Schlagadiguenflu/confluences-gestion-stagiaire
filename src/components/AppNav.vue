<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Barre de navigation de l'application
  -- Fichier : AppNav.vue
  -->

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
          :to="{ name: link.routeName }"
          exact
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
        <v-list-group
          prepend-icon="mdi-cog"
          :value="false"
          active-class="white--text"
        >
          <template v-slot:activator>
            <v-list-item-title class="text-uppercase">
              Configuration
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="configurationLink in configurationLinks"
            :key="configurationLink.label"
            configurationLink
            :to="{ name: configurationLink.routeName }"
          >
            <v-list-item-icon>
              <v-icon></v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-uppercase white--text">
              {{ configurationLink.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
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
          :to="{ name: link.routeName }"
          exact
        >
          {{ link.label }}
        </v-btn>
        <v-menu v-if="this.loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color:white
              text
              rounded
              class="my-2"
            >
              Configuration
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="configurationLink in configurationLinks"
              :key="configurationLink.label"
              configurationLink
              :to="{ name: configurationLink.routeName }"
            >
              <v-list-item-title class="text-uppercase">
                {{ configurationLink.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
          routeName: 'Home',
          icon: 'mdi-home',
          loggedIn: false
        },
        {
          label: 'Entreprises',
          routeName: 'Entreprises',
          icon: 'mdi-office-building-outline',
          loggedIn: true
        },
        {
          label: 'Stages',
          routeName: 'Stages',
          icon: 'mdi-briefcase-outline',
          loggedIn: true
        },
        {
          label: 'Stages par stagiaire',
          routeName: 'Stagiaires',
          icon: 'mdi-account-hard-hat',
          loggedIn: true
        },
        {
          label: 'Contacts',
          routeName: 'Contacts',
          icon: 'mdi-card-account-mail',
          loggedIn: true
        }
      ],
      configurationLinks: [
        {
          label: 'Affiliations',
          routeName: 'Affiliations'
        },
        {
          label: 'Annonces',
          routeName: 'Annonces'
        },
        {
          label: 'Domaines',
          routeName: 'Domaines'
        },
        {
          label: 'Métiers',
          routeName: 'Metiers'
        },
        {
          label: 'Moyens',
          routeName: 'Moyens'
        },
        {
          label: 'Offres',
          routeName: 'Offres'
        },
        {
          label: "Type d'entreprise",
          routeName: 'Type-Entreprises'
        },
        {
          label: 'Type de stage',
          routeName: 'Type-Stages'
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
