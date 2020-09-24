<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Filtre du stage
  -- Fichier : FilterStage.vue
  -->

<template>
  <v-form ref="formFilterStage" v-model="validFilterStage" lazy-validation>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary" dark class="mr-4 mb-4">
          Filtrer
        </v-btn>
        <v-btn
          color="primary"
          dark
          @click="deletefilterStage()"
          class="mr-4 mb-4"
        >
          Effacer le filtre
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Filtrer les stages</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Tous les filtres sont optionnels :
          </h3>
          <v-card class="mx-auto" tile>
            <v-row>
              <v-col class="mx-4">
                <v-text-field
                  v-model="stage.filter.nom"
                  :counter="50"
                  :rules="nameRules"
                  label="Nom"
                ></v-text-field>
                <v-autocomplete
                  v-model="stage.filter.typeMetierId"
                  :items="typeMetier.typeMetiers"
                  item-value="typeMetierId"
                  item-text="libelle"
                  label="Métier"
                  clearable
                ></v-autocomplete>
                <v-autocomplete
                  v-model="stage.filter.entrepriseId"
                  :items="entreprise.entreprises"
                  item-value="entrepriseId"
                  item-text="nom"
                  label="Entreprise"
                  clearable
                ></v-autocomplete>
                <v-autocomplete
                  v-model="stage.filter.stagiaireId"
                  :items="user.users"
                  item-value="id"
                  item-text="nom"
                  label="Stagiaire"
                  clearable
                ></v-autocomplete>
                <v-menu
                  ref="menuDebut"
                  v-model="menuDebut"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="stage.filter.dateDebut"
                      label="Date de début"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="stage.filter.dateDebut"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDebut = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuDebut.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menuFin"
                  v-model="menuFin"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="stage.filter.dateFin"
                      label="Date de fin"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="stage.filter.dateFin"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuFin = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuFin.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <v-autocomplete
                  v-model="stage.filter.typeStageId"
                  :items="typeStage.typeStages"
                  item-value="typeStageId"
                  item-text="nom"
                  label="Taux d'occupation"
                  clearable
                ></v-autocomplete>
                <v-autocomplete
                  v-model="stage.filter.typeAnnonceId"
                  :items="typeAnnonce.typeAnnonces"
                  item-value="typeAnnonceId"
                  item-text="libelle"
                  label="Type d'annonce"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
          <v-btn color="blue darken-1" text @click="filterStage()">
            Filtrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'

export default {
  data: () => ({
    date: null,
    menuDebut: false,
    menuFin: false,
    validFilterStage: true,
    dialog: false,
    nameRules: [
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ]
  }),

  // Pas besoin de charger les données, se fait déjà le composant CreateStage.vue
  beforeCreate() {},

  computed: {
    ...mapState([
      'stage',
      'user',
      'typeMetier',
      'entreprise',
      'typeStage',
      'typeAnnonce'
    ])
  },

  methods: {
    // Sauvegarde et filtre les stages
    filterStage() {
      if (this.$refs.formFilterStage.validate()) {
        NProgress.start()
        store
          .dispatch('stage/saveFilterStage', this.stage.filter)
          .then(() => {})
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    // Efface le filtre
    deletefilterStage() {
      NProgress.start()
      store
        .dispatch('stage/deleteFilterStage')
        .then(() => {})
        .catch(() => {})
      store
        .dispatch('stage/fetchStages', true)
        .then(() => {})
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
