<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'une annonce depuis la liste des annonces
  -- Fichier : CreateAnnonceFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateAnnonce"
      v-model="validCreateAnnonce"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter une annonce
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter une annonce</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeAnnonce.libelle"
              :counter="30"
              :rules="libelleRules"
              label="Nom"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fermer
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit()">
              Sauvegarder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-row>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'

export default {
  data: () => ({
    validCreateAnnonce: true,
    dialog: false,
    typeAnnonce: {
      typeAnnonceId: 0,
      code: null,
      libelle: null
    },
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 30 || 'Le champ doit être moins que 30 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'une annonce
    submit() {
      if (this.$refs.formCreateAnnonce.validate()) {
        NProgress.start()
        store
          .dispatch('typeAnnonce/createTypeAnnonce', this.typeAnnonce)
          .then(() => {
            this.addNewData()
            this.$refs.formCreateAnnonce.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    },
    // Ajoute l'annonce
    addNewData() {
      store
        .dispatch('typeAnnonce/fetchTypeAnnonces', this.typeAnnonce)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
