<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'un contact
  -- Fichier : DeleteContact.vue
  -->

<template>
  <v-form ref="formDeleteContact" v-model="validCreateContact" lazy-validation>
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
          <span class="headline">Supprimer un contact</span>
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
          <v-btn color="red darken-1" text @click="deleteContact()">
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
    contact: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateContact: true,
    dialog: false
  }),

  methods: {
    // Supprime le contact
    deleteContact() {
      NProgress.start()
      store
        .dispatch('contact/deleteContact', this.contact)
        .then(() => {
          this.$router.push({
            name: 'Contacts'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
