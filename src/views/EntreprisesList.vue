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
    >
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
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

export default {
  components: {
    CreateEntreprise,
    FilterEntreprise
  },

  data: () => ({
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
    getEntreprises(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getEntreprises(routeTo, next)
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
