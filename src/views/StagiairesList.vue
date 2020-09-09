<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4"> </v-col>
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
      :items="stagiaire.stagiaires"
      :items-per-page="variables.itemsPerPage"
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

function getStagiaires(routeTo, next) {
  store.dispatch('stagiaire/fetchStagiaires', true).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  getStagiaires(routeTo, next)
}

export default {
  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Prenom',
        value: 'prenom'
      },
      {
        text: 'Nom',
        value: 'nom'
      },
      { text: 'Affiliation', value: 'typeAffiliation.libelle' }
    ],
    stagiaires: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    store
      .dispatch('variables/setCurrentPageStagiaire', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    this.options.page = store.state.variables.currentPageStagiaire
  },

  computed: {
    ...mapState(['stagiaire', 'variables'])
  },

  methods: {
    selectRow(event) {
      this.$router.push({
        name: 'Stagiaire-Modifier',
        params: { id: event.stagiaireId }
      })
    },

    updateNumberItems(event) {
      store
        .dispatch('variables/setItemsPerPage', {
          number: event
        })
        .then(() => {})
    },

    updatePageSearch() {
      this.options.page = 1
    }
  }
}
</script>
