<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 13.10.2020
  -- Description : Formulaire de création d'un domaine depuis une entreprise
  -- Fichier : CreateDomaine.vue
  -->

<template>
  <v-row justify="end">
    <v-form
      ref="formCreateDomaine"
      v-model="validCreateDomaine"
      lazy-validation
    >
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
            <span class="headline">Ajouter un domaine</span>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="entrepriseDomaine.typeDomaineId"
              :items="typeDomaine.typeDomaines"
              item-value="typeDomaineId"
              item-text="libelle"
              :rules="[v => !!v || 'Obligatoire']"
              label="Type de domaine"
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

function getTypeDomaines() {
  store.dispatch('typeDomaine/fetchTypeDomaines', {}).then(() => {})
}

export default {
  props: {
    typeEntrepriseId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    validCreateDomaine: true,
    dialog: false,
    entrepriseDomaine: {
      entrepriseId: 0,
      typeDomaineId: 0,
      typeDomaine: {
        entrepriseDomaines: [],
        libelle: '',
        typDomaineId: 0
      }
    }
  }),

  // Charger les différents possibilités de choix avant la création du composant
  beforeCreate(routeTo, routeFrom, next) {
    getTypeDomaines(routeTo, next)
  },

  created() {
    this.entrepriseDomaine.entrepriseId = this.typeEntrepriseId
  },

  computed: {
    ...mapState(['typeDomaine'])
  },

  methods: {
    // Si le formulaire est valide, création d'une domaine à une entreprise
    submit() {
      if (this.$refs.formCreateDomaine.validate()) {
        NProgress.start()
        store
          .dispatch(
            'entrepriseDomaine/createEntrepriseDomaine',
            this.entrepriseDomaine
          )
          .then(() => {
            let entrepriseDomaineClone = JSON.parse(
              JSON.stringify(this.entrepriseDomaine)
            )
            entrepriseDomaineClone.typeDomaine.libelle = this.typeDomaine.typeDomaines.find(
              t => t.typeDomaineId == entrepriseDomaineClone.typeDomaineId
            ).libelle
            this.addNewData(entrepriseDomaineClone)
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    // Ajoute le domaine à l'entreprise
    addNewData(data) {
      store
        .dispatch('entreprise/addDomaine', data)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
