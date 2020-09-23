<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de modification d'un domaine
  -- Fichier : DomaineEdit.vue
  -->

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Domaine</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form
          ref="formCreateTypeDomaine"
          v-model="validCreateTypeDomaine"
          lazy-validation
        >
          <v-text-field
            v-model="typeDomaine.code"
            :counter="3"
            label="Code"
            :rules="codeRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="typeDomaine.libelle"
            :counter="60"
            :rules="libelleRules"
            label="Nom"
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <div class="action-container">
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              class="ma-2"
              tile
              color="success"
              dark
              min-width="150"
              @click="submit()"
            >
              Sauvegarder
            </v-btn>
            <DeleteTypeDomaine :typeDomaine="this.typeDomaine" />
            <v-btn
              class="ma-2"
              tile
              color="primary"
              dark
              min-width="150"
              @click="$router.go(-1)"
            >
              Annuler
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'
import DeleteTypeDomaine from '@/components/DeleteTypeDomaine.vue'

export default {
  props: {
    typeDomaine: {
      type: Object,
      required: true
    }
  },

  components: {
    DeleteTypeDomaine
  },

  data: () => ({
    validCreateTypeDomaine: true,
    dialog: false,
    codeRules: [
      v => !!v || 'Le champ est obligatoire',
      v => /(\b[A-Z0-9]{1,}\b)/.test(v) || 'En majuscule seulement',
      v => (v && v.length <= 3) || 'Le nom doit être moins que 3 caractères'
    ],
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 60 || 'Le champ doit être moins que 60 caractères'
    ]
  }),

  methods: {
    // Si le formulaire est valide, sauvegarde du domaine
    submit() {
      if (this.$refs.formCreateTypeDomaine.validate()) {
        NProgress.start()
        store
          .dispatch('typeDomaine/editTypeDomaine', this.typeDomaine)
          .then(() => {
            this.$router.push({
              name: 'Domaines'
            })
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    }
  }
}
</script>
