<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateEntreprise />
      </v-col>
      <v-col cols="12" md="4">
        <FilterEntreprise />
      </v-col>
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
      :items="entreprise.entreprises"
      :items-per-page="variables.itemsPerPage"
      :search="search"
      class="elevation-1"
      @click:row="selectRow"
      @update:items-per-page="updateNumberItems"
      :options.sync="options"
    >
      <template v-slot:no-data>
        Pas de données disponibles
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import CreateEntreprise from '@/components/CreateEntreprise.vue'
import FilterEntreprise from '@/components/FilterEntreprise.vue'

function getEntreprises(routeTo, next) {
  store.dispatch('entreprise/fetchEntreprises', {}).then(() => {
    next()
  })
}

function getEntreprisesWithFilter(routeTo, next, filter) {
  store.dispatch('entreprise/saveFilterEntreprise', filter).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  if (
    store.state.entreprise.filter.metiers.length > 0 ||
    store.state.entreprise.filter.offres.length > 0 ||
    store.state.entreprise.filter.domaines.length > 0 ||
    store.state.entreprise.filter.codePostal != null ||
    store.state.entreprise.filter.nom != null ||
    store.state.entreprise.filter.createur != null ||
    store.state.entreprise.filter.dateModification != null
  ) {
    console.log('with filter')
    getEntreprisesWithFilter(routeTo, next, store.state.entreprise.filter)
  } else {
    getEntreprises(routeTo, next)
  }
}

export default {
  components: {
    CreateEntreprise,
    FilterEntreprise
  },

  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Nom',
        value: 'nom'
      },
      { text: 'Domaine', value: 'typeDomaine.libelle' },
      { text: 'Ville', value: 'ville' },
      { text: 'Code postal', value: 'codePostal' }
    ],
    entreprises: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    store
      .dispatch('variables/setCurrentPageEntreprise', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    this.options.page = store.state.variables.currentPageEntreprise
  },

  computed: {
    ...mapState(['entreprise', 'variables'])
  },

  methods: {
    selectRow(event) {
      this.$router.push({
        name: 'Entreprise-Modifier',
        params: { id: event.entrepriseId }
      })
    },

    updateNumberItems(event) {
      store
        .dispatch('variables/setItemsPerPage', {
          number: event
        })
        .then(() => {})
    }
  }
}
</script>
