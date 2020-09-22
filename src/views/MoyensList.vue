<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 22.09.2020
  -- Description : Liste des moyens
  -- Fichier : MoyensList.vue
  -->

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateMoyenFromList />
      </v-col>
      <v-col cols="12" md="4"> </v-col>
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
      :items="typeMoyen.typeMoyens"
      :items-per-page="settings.itemsPerPage"
      :search="search"
      class="elevation-1"
      @click:row="selectRow"
      @update:items-per-page="updateNumberItems"
      :options.sync="options"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import CreateMoyenFromList from '@/components/CreateMoyenFromList.vue'

function getTypeMoyens(routeTo, next) {
  store.dispatch('typeMoyen/fetchTypeMoyens', true).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  getTypeMoyens(routeTo, next)
}

export default {
  components: {
    CreateMoyenFromList
  },

  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Code',
        value: 'code'
      },
      {
        text: 'Nom',
        value: 'libelle'
      }
    ],
    typeMoyens: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    // Sauvegarde le numéro de page consulté du tableau moyen avant de changer de page
    store
      .dispatch('settings/setCurrentPageTypeMoyen', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    // Récupère la dernier numéro de page consulté
    this.options.page = store.state.settings.currentPageTypeMoyen
  },

  computed: {
    ...mapState(['typeMoyen', 'settings'])
  },

  methods: {
    // Lorsqu'une donnée est selectionnée dans le tableau, redirige vers le formulaire de modification
    selectRow(event) {
      this.$router.push({
        name: 'TypeMoyen-Modifier',
        params: { id: event.typeMoyenId }
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
    }
  }
}
</script>
