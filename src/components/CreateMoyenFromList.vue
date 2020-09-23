<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un moyen depuis la liste des moyens
  -- Fichier : CreateMoyenFromList.vue
  -->

<template>
  <v-row>
    <v-form ref="formCreateMoyen" v-model="validCreateMoyen" lazy-validation>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un moyen
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un moyen</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeMoyen.code"
              :counter="3"
              label="Code"
              :rules="codeRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="typeMoyen.libelle"
              :counter="20"
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
    validCreateMoyen: true,
    dialog: false,
    typeMoyen: {
      typeMoyenId: 0,
      code: null,
      libelle: null
    },
    codeRules: [
      v => !!v || 'Le champ est obligatoire',
      v => /(\b[A-Z0-9]{1,}\b)/.test(v) || 'En majuscule seulement',
      v => (v && v.length <= 3) || 'Le nom doit être moins que 3 caractères'
    ],
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 20 || 'Le champ doit être moins que 20 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'un moyen
    submit() {
      if (this.$refs.formCreateMoyen.validate()) {
        NProgress.start()
        store
          .dispatch('typeMoyen/createTypeMoyen', this.typeMoyen)
          .then(() => {
            this.$refs.formCreateMoyen.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    }
  }
}
</script>
