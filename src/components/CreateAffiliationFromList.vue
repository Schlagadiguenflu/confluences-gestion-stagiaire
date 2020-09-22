<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'une affiliation depuis la liste des affiliations
  -- Fichier : CreateAffiliationFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateAffiliation"
      v-model="validCreateAffiliation"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter une affiliation
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter une affiliation</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeAffiliation.code"
              :counter="10"
              label="Code"
              :rules="codeRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="typeAffiliation.libelle"
              :counter="50"
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
    validCreateAffiliation: true,
    dialog: false,
    typeAffiliation: {
      typeAffiliationId: 0,
      code: null,
      libelle: null
    },
    codeRules: [
      v => !!v || 'Le champ est obligatoire',
      v => /(\b[A-Z0-9]{1,}\b)/.test(v) || 'En majuscule seulement',
      v => (v && v.length <= 10) || 'Le nom doit être moins que 10 caractères'
    ],
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'une affiliation
    submit() {
      if (this.$refs.formCreateAffiliation.validate()) {
        NProgress.start()
        store
          .dispatch(
            'typeAffiliation/createTypeAffiliation',
            this.typeAffiliation
          )
          .then(() => {
            this.addNewData()
            this.$refs.formCreateAffiliation.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    },
    // Ajoute l'affiliation
    addNewData() {
      store
        .dispatch('typeAffiliation/fetchTypeAffiliations', this.typeAffiliation)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
