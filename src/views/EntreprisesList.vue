<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des entreprises
  -- Fichier : EntreprisesList.vue
  -->

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
          @click="updatePageSearch"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="entreprise.entreprises"
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
import CreateEntreprise from '@/components/CreateEntreprise.vue'
import FilterEntreprise from '@/components/FilterEntreprise.vue'

function getEntreprises(routeTo, next) {
  store.dispatch('entreprise/fetchEntreprises', true).then(() => {
    next()
  })
}

function getEntreprisesWithFilter(routeTo, next, filter) {
  store.dispatch('entreprise/saveFilterEntreprise', filter).then(() => {
    next()
  })
}

// Si un filtre existe l'appliquer, permet de ne pas relectionner
// le filtre à chaque chargement de la liste des entreprises
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
      { text: 'Domaine', value: 'domaines' },
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
    // Sauvegarde le numéro de page consulté du tableau entreprise avant de changer de page
    store
      .dispatch('settings/setCurrentPageEntreprise', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    // Récupère le dernier numéro de page consulté
    this.options.page = store.state.settings.currentPageEntreprise
  },

  computed: {
    ...mapState(['entreprise', 'settings'])
  },

  methods: {
    // Lorsqu'une donnée est selectionnée dans le tableau, redirige vers le formulaire de modification
    selectRow(event) {
      this.$router.push({
        name: 'Entreprise-Modifier',
        params: { id: event.entrepriseId }
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
