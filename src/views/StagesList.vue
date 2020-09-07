<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateStage />
      </v-col>
      <v-col cols="12" md="4"> </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="stage.stages"
      :items-per-page="variables.itemsPerPage"
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
      <template v-slot:no-data>
        Pas de données disponibles
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import CreateStage from '@/components/CreateStage.vue'
import moment from 'moment'

function getStages(routeTo, next) {
  store.dispatch('stage/fetchStages', {}).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  getStages(routeTo, next)
}

export default {
  components: {
    CreateStage
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
      { text: 'Fin', value: 'fin' }
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
    store
      .dispatch('variables/setCurrentPageStage', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    this.options.page = store.state.variables.currentPageStage
  },

  computed: {
    ...mapState(['stage', 'variables'])
  },

  methods: {
    selectRow(event) {
      this.$router.push({
        name: 'Stage-Modifier',
        params: { id: event.stageId }
      })
    },

    updateNumberItems(event) {
      store
        .dispatch('variables/setItemsPerPage', {
          number: event
        })
        .then(() => {})
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
