<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un domaine depuis la liste des domaines
  -- Fichier : CreateDomaineFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateDomaine"
      v-model="validCreateDomaine"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un domaine
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un domaine</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="typeDomaine.libelle"
              :counter="60"
              :rules="libelleRules"
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model="typeDomaine.oldNames"
              :counter="300"
              label="Autres noms"
              :rules="oldNamesRules"
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
    validCreateDomaine: true,
    dialog: false,
    typeDomaine: {
      typeDomaineId: 0,
      code: null,
      libelle: null
    },
    oldNamesRules: [
      v =>
        !v || v.length <= 300 || 'Le champ doit être moins que 300 caractères'
    ],
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 60 || 'Le champ doit être moins que 60 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, création d'un domaine
    submit() {
      if (this.$refs.formCreateDomaine.validate()) {
        NProgress.start()
        store
          .dispatch('typeDomaine/createTypeDomaine', this.typeDomaine)
          .then(() => {
            this.$refs.formCreateDomaine.reset()
            this.dialog = false
          })
          .catch(() => {})

        NProgress.done()
      }
    }
  }
}
</script>
