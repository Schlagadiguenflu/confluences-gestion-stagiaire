<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des métiers
  -- Fichier : MetiersList.vue
  -->

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateMetierFromList />
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
      :items="typeMetier.typeMetiers"
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
import CreateMetierFromList from '@/components/CreateMetierFromList.vue'

function getTypeMetiers(routeTo, next) {
  store.dispatch('typeMetier/fetchTypeMetiers', true).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  getTypeMetiers(routeTo, next)
}

export default {
  components: {
    CreateMetierFromList
  },

  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Nom',
        value: 'libelle'
      },
      {
        text: 'Autres noms',
        value: 'oldNames'
      }
    ],
    typeMetiers: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    // Sauvegarde le numéro de page consulté du tableau métier avant de changer de page
    store
      .dispatch('settings/setCurrentPageTypeMetier', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    // Récupère la dernier numéro de page consulté
    this.options.page = store.state.settings.currentPageTypeMetier
  },

  computed: {
    ...mapState(['typeMetier', 'settings'])
  },

  methods: {
    // Lorsqu'une donnée est selectionnée dans le tableau, redirige vers le formulaire de modification
    selectRow(event) {
      this.$router.push({
        name: 'TypeMetier-Modifier',
        params: { id: event.typeMetierId }
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
