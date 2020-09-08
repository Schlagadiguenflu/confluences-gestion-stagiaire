<template>
  <v-data-table
    :headers="headers"
    :items="entreprise.stages"
    :items-per-page="5"
    @click:row="viewStage"
    class="elevation-1"
    outlined
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
</template>

<script>
import moment from 'moment'

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      headers: [
        {
          text: 'Date début',
          value: 'debut'
        },
        { text: 'Date Fin', value: 'fin' },
        { text: 'Stagiaire', value: 'stagiaire.firstname' },
        { text: 'Métier', value: 'typeMetier.libelle' }
      ]
    }
  },

  methods: {
    formatDate: function(date) {
      return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    },
    viewStage(item) {
      this.$router.push({
        name: 'Stage-Modifier',
        params: { id: item.stageId }
      })
    }
  }
}
</script>

<style></style>
