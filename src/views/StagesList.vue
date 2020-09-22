<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des stages
  -- Fichier : StagesList.vue
  -->

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateStage />
      </v-col>
      <v-col cols="12" md="4">
        <FilterStage />
      </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
          @click="updatePageSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="stage.stages"
      :items-per-page="settings.itemsPerPage"
      :search="search"
      class="elevation-1"
      @click:row="selectRow"
      @update:items-per-page="updateNumberItems"
      :options.sync="options"
    >
      <template v-slot:item.stagiaire.firstname="{ item }">
        {{ item.stagiaire.firstname + ' ' + item.stagiaire.lastName }}
      </template>
      <template v-slot:item.debut="{ item }">
        {{ formatDate(item.debut) }}
      </template>
      <template v-slot:item.fin="{ item }">
        {{ formatDate(item.fin) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import CreateStage from '@/components/CreateStage.vue'
import FilterStage from '@/components/FilterStage.vue'
import moment from 'moment'

function getStages(routeTo, next) {
  store.dispatch('stage/fetchStages', {}).then(() => {
    next()
  })
}

function getStagesWithFilter(routeTo, next, filter) {
  store.dispatch('stage/saveFilterStage', filter).then(() => {
    next()
  })
}

// Si un filtre existe l'appliquer, permet de ne pas relectionner
// le filtre à chaque chargement de la liste des stages
function loadData(routeTo, routeFrom, next) {
  if (
    store.state.stage.filter.nom != null ||
    store.state.stage.filter.typeMetierId != null ||
    store.state.stage.filter.entrepriseId != null ||
    store.state.stage.filter.stagiaireId != null ||
    store.state.stage.filter.dateDebut != null ||
    store.state.stage.filter.dateFin != null ||
    store.state.stage.filter.typeStageId != null ||
    store.state.stage.filter.typeAnnonceId != null
  ) {
    getStagesWithFilter(routeTo, next, store.state.stage.filter)
  } else {
    getStages(routeTo, next)
  }
}

export default {
  components: {
    CreateStage,
    FilterStage
  },

  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Nom',
        value: 'nom'
      },
      { text: 'Métier', value: 'typeMetier.libelle' },
      { text: 'Entreprise', value: 'entreprise.nom' },
      {
        text: 'Stagiaire',
        value: 'stagiaire.firstname'
      },
      { text: 'Début', value: 'debut' },
      { text: 'Fin', value: 'fin' },
      { text: 'Type', value: 'typeStage.nom' },
      { text: 'Annonce', value: 'typeAnnonce.libelle' }
    ],
    stages: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    // Sauvegarde le numéro de page consulté du tableau stage avant de changer de page
    store
      .dispatch('settings/setCurrentPageStage', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    // Récupère la dernier numéro de page consulté
    this.options.page = store.state.settings.currentPageStage
  },

  computed: {
    ...mapState(['stage', 'settings'])
  },

  methods: {
    // Lorsqu'une donnée est selectionnée dans le tableau, redirige vers le formulaire de modification
    selectRow(event) {
      this.$router.push({
        name: 'Stage-Modifier',
        params: { id: event.stageId }
      })
    },
    // Met à jour le nombre d'élément à afficher dans un tableau
    updateNumberItems(event) {
      store
        .dispatch('settings/setItemsPerPage', {
          number: event
        })
        .then(() => {})
    },
    // Quand une recherche est effectuée, partir de la première page
    updatePageSearch() {
      this.options.page = 1
    },
    formatDate(value) {
      let date = moment(value).format('YYYY-MM-DD')
      if (date == 'Invalid date') {
        date = null
      }
      return date
    }
  }
}
</script>
