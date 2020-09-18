<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un métier depuis la liste des métiers
  -- Fichier : CreateMetierFromList.vue
  -->

<template>
  <v-row>
    <v-form ref="formCreateMetier" v-model="validCreateMetier" lazy-validation>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un métier
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un métier</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeMetier.code"
              :counter="10"
              label="Code"
              :rules="codeRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="typeMetier.libelle"
              :counter="60"
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

function getEntreprises() {
  store.dispatch('entreprise/fetchEntreprises', {}).then(() => {})
}

export default {
  data: () => ({
    validCreateMetier: true,
    dialog: false,
    typeMetier: {
      typeMetierId: 0,
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
      v => !v || v.length <= 60 || 'Le champ doit être moins que 60 caractères'
    ]
  }),

  // Charger les différents possibilités de choix avant la création du composant
  beforeCreate(routeTo, routeFrom, next) {
    getEntreprises(routeTo, next)
  },

  methods: {
    // Si le formulaire est valide, création d'un métier à une entreprise
    submit() {
      if (this.$refs.formCreateMetier.validate()) {
        NProgress.start()
        store
          .dispatch('typeMetier/createTypeMetier', this.typeMetier)
          .then(() => {
            this.addNewData()
            this.$refs.formCreateMetier.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    },
    // Ajoute le métier à l'entreprise
    addNewData() {
      store
        .dispatch('typeMetier/fetchTypeMetiers', this.typeMetier)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
