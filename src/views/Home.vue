<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Page d'accueil de l'application
  -- Fichier : Home.vue
  -->

<template>
  <div>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :max-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          src="@/assets/background-img.jpg"
        >
          <v-theme-provider dark>
            <v-container fill-height fluid>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  

                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-2' : 'display-3'
                    ]"
                    class="font-weight-black"
                  >
                    BASE EMPLOI
                  </span>
                  <br />
                  <span
                    v-if="loggedIn"
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-0' : 'display-1'
                    ]"
                    class="font-weight-light"
                  >
                    BIENVENUE
                  </span>

                  
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  @click="$vuetify.goTo('#about-me')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">A PROPOS</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          Cette application est diponible pour les membres de l'association
          Confluences. Afin de pouvoir utiliser pleinement cette application,
          veuillez vous connectez svp.
        </v-responsive>
      </v-container>

      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import { authComputed } from '../vuex/helpers'
export default {
  name: 'Home',
  data() {
    return {
      name: 'Confluences - Gestion des stagiaires'
    }
  },
  computed: {
    ...authComputed
  }
}
</script>
