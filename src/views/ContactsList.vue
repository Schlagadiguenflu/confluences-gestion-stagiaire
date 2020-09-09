<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <CreateContactFromList />
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
      :items="contact.contacts"
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
import CreateContactFromList from '@/components/CreateContactFromList.vue'

function getContacts(routeTo, next) {
  store.dispatch('contact/fetchContacts', true).then(() => {
    next()
  })
}

function loadData(routeTo, routeFrom, next) {
  getContacts(routeTo, next)
}

export default {
  components: {
    CreateContactFromList
  },

  data: () => ({
    options: {},
    search: '',
    headers: [
      {
        text: 'Entreprise',
        value: 'entreprise.nom'
      },
      {
        text: 'Nom',
        value: 'nom'
      },
      {
        text: 'Prenom',
        value: 'prenom'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Téléphone fixe',
        value: 'telFix'
      },
      { text: 'Natel', value: 'natel' }
    ],
    contacts: []
  }),

  beforeRouteEnter(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    loadData(routeTo, routeFrom, next)
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    store
      .dispatch('variables/setCurrentPageContact', {
        number: this.options.page
      })
      .then(() => {})
    next()
  },

  created() {
    this.options.page = store.state.variables.currentPageContact
  },

  computed: {
    ...mapState(['contact', 'variables'])
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
    },

    updatePageSearch() {
      this.options.page = 1
    }
  }
}
</script>
