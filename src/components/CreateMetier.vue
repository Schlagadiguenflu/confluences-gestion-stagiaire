<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un métier depuis une entreprise
  -- Fichier : CreateMetier.vue
  -->

<template>
  <v-row justify="end">
    <v-form ref="formCreateMetier" v-model="validCreateMetier" lazy-validation>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
            outlined
            fab
            x-small
            class="mx-3"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un métier</span>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="entrepriseMetier.typeMetierId"
              :items="typeMetier.typeMetiers"
              item-value="typeMetierId"
              item-text="libelle"
              :rules="[v => !!v || 'Obligatoire']"
              label="Type de métier"
              required
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fermer
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit()"
              >Sauvegarder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-row>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'

function getTypeMetiers() {
  store.dispatch('typeMetier/fetchTypeMetiers', {}).then(() => {})
}

export default {
  props: {
    typeEntrepriseId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    validCreateMetier: true,
    dialog: false,
    entrepriseMetier: {
      entrepriseId: 0,
      typeMetierId: 0,
      typeMetier: {
        entrepriseMetiers: [],
        libelle: '',
        typeMetierId: 0
      }
    }
  }),

  // Charger les différents possibilités de choix avant la création du composant
  beforeCreate(routeTo, routeFrom, next) {
    getTypeMetiers(routeTo, next)
  },

  created() {
    this.entrepriseMetier.entrepriseId = this.typeEntrepriseId
  },

  computed: {
    ...mapState(['typeMetier'])
  },

  methods: {
    // Si le formulaire est valide, création d'un métier à une entreprise
    submit() {
      if (this.$refs.formCreateMetier.validate()) {
        NProgress.start()
        store
          .dispatch(
            'entrepriseMetier/createEntrepriseMetier',
            this.entrepriseMetier
          )
          .then(() => {
            let entrepriseMetierClone = JSON.parse(
              JSON.stringify(this.entrepriseMetier)
            )
            entrepriseMetierClone.typeMetier.libelle = this.typeMetier.typeMetiers.find(
              t => t.typeMetierId == entrepriseMetierClone.typeMetierId
            ).libelle
            this.addNewData(entrepriseMetierClone)
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    // Ajoute le métier à l'entreprise
    addNewData(data) {
      store
        .dispatch('entreprise/addMetier', data)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
