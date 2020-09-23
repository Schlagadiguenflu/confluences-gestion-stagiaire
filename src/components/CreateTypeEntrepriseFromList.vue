<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un type d'entreprise depuis la liste des entreprise
  -- Fichier : CreateTypeEntrepriseFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateTypeEntreprise"
      v-model="validCreateTypeEntreprise"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un statut d'entreprise
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un statut d'entreprise</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeEntreprise.nom"
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
    validCreateTypeEntreprise: true,
    dialog: false,
    typeEntreprise: {
      typeEntrepriseId: 0,
      code: null,
      libelle: null
    },
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'un type d'entreprise
    submit() {
      if (this.$refs.formCreateTypeEntreprise.validate()) {
        NProgress.start()
        store
          .dispatch('typeEntreprise/createTypeEntreprise', this.typeEntreprise)
          .then(() => {
            this.$refs.formCreateTypeEntreprise.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    }
  }
}
</script>
