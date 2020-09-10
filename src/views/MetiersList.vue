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
        text: 'Code',
        value: 'code'
      },
      {
        text: 'Nom',
        value: 'libelle'
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
    store
      .dispatch('variables/setCurrentPageTypeMetier', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    this.options.page = store.state.variables.currentPageTypeMetier
  },

  computed: {
    ...mapState(['typeMetier', 'variables'])
  },

  methods: {
    selectRow(event) {
      this.$router.push({
        name: 'TypeMetier-Modifier',
        params: { id: event.typeMetierId }
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
