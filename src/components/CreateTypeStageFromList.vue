<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un type de stage depuis la liste des stages
  -- Fichier : CreateTypeStageFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateTypeStage"
      v-model="validCreateTypeStage"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un taux d'occupation
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un taux d'occupation</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeStage.nom"
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
    validCreateTypeStage: true,
    dialog: false,
    typeStage: {
      typeStageId: 0,
      code: null,
      libelle: null
    },
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'un type de stage
    submit() {
      if (this.$refs.formCreateTypeStage.validate()) {
        NProgress.start()
        store
          .dispatch('typeStage/createTypeStage', this.typeStage)
          .then(() => {
            this.$refs.formCreateTypeStage.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    }
  }
}
</script>
