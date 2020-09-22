<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'une annonce
  -- Fichier : DeleteTypeAnnonce.vue
  -->

<template>
  <v-form
    ref="formDeleteTypeAnnonce"
    v-model="validCreateTypeAnnonce"
    lazy-validation
  >
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          tile
          color="red"
          dark
          min-width="150"
          class="ma-2"
        >
          Supprimer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Supprimer une annonce</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une suppression est définitive !
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteTypeAnnonce()">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'

export default {
  props: {
    typeAnnonce: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateTypeAnnonce: true,
    dialog: false
  }),

  methods: {
    // Supprime une annonce
    deleteTypeAnnonce() {
      NProgress.start()
      store
        .dispatch(
          'typeAnnonce/deleteTypeAnnonce',
          this.typeAnnonce.typeAnnonceId
        )
        .then(() => {
          this.$router.push({
            name: 'Annonces'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
