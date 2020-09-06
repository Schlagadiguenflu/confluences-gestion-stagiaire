<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Date début</th>
          <th class="text-left">Date Fin</th>
          <th class="text-left">Stagiaire</th>
          <th class="text-left">Métier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in entreprise.stages" :key="i">
          <td>{{ frontEndDateFormat(item.debut) }}</td>
          <td>{{ frontEndDateFormat(item.fin) }}</td>
          <td>
            {{ item.stagiaire.firstname }}
            {{ item.stagiaire.lastName }}
          </td>
          <td>{{ item.typeMetier.libelle }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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

  methods: {
    frontEndDateFormat: function(date) {
      return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}
</script>

<style></style>
