<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Stagiaire</h1>
      </v-col>
    </v-row>
    <v-form ref="formStagiaire" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="stagiaire.nom"
                :rules="nameRules"
                label="Nom du stagiaire"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="stagiaire.prenom"
                :rules="nameRules"
                label="Prénom du stagiaire"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="stagiaire.typeAffiliationId"
                :items="typeAffiliation.typeAffiliations"
                item-value="typeAffiliationId"
                item-text="libelle"
                label="Affiliation"
                clearable
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="mx-auto" outlined>
            <v-list>
              <v-subheader>
                Stages effectués
                <v-spacer></v-spacer>
              </v-subheader>
              <v-data-table
                :headers="headers"
                :items="stagiaire.stageStagiaires"
                :items-per-page="10"
                @click:row="viewStage"
                class="elevation-1"
                outlined
              >
                <template v-slot:item.debut="{ item }">
                  {{ formatDate(item.debut) }}
                </template>
                <template v-slot:item.fin="{ item }">
                  {{ formatDate(item.fin) }}
                </template>
                <template v-slot:item.rapport="{ item }">
                  <v-checkbox v-model="item.rapport" disabled></v-checkbox>
                </template>
                <template v-slot:item.attestation="{ item }">
                  <v-checkbox v-model="item.attestation" disabled></v-checkbox>
                </template>
              </v-data-table>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <div class="action-container">
        <v-row>
          <v-col>
            <div class="text-center">
              <v-btn
                class="ma-2"
                tile
                color="success"
                dark
                min-width="150"
                @click="submit()"
              >
                Sauvegarder
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import moment from 'moment'

function getTypeAffiliations() {
  store.dispatch('typeAffiliation/fetchTypeAffiliations', {}).then(() => {})
}

export default {
  props: {
    stagiaire: {
      type: Object,
      required: true
    }
  },

  components: {},

  data: () => ({
    headers: [
      {
        text: 'Entreprise',
        value: 'entreprise.nom'
      },
      { text: 'Adresse', value: 'entreprise.adr1' },
      { text: 'Ville', value: 'entreprise.ville' },
      { text: 'Début', value: 'debut' },
      { text: 'Fin', value: 'fin' },
      { text: 'Métier', value: 'typeMetier.libelle' },
      { text: 'Rapport', value: 'rapport' },
      { text: 'Attestation', value: 'attestation' }
    ],
    valid: true,
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ],
    select: null
  }),

  beforeCreate(routeTo, routeFrom, next) {
    getTypeAffiliations(routeTo, next)
  },

  created() {},

  computed: {
    ...mapState(['typeAffiliation'])
  },

  methods: {
    submit() {
      if (this.$refs.formStagiaire.validate()) {
        NProgress.start()
        if (this.stagiaire.typeAffiliationId == null) {
          console.log('doesnt exist')
          this.stagiaire.typeAffiliation = null
        } else {
          console.log(this.stagiaire.typeAffiliationId)
        }
        store
          .dispatch('stagiaire/editStagiaire', this.stagiaire)
          .then(() => {
            this.$router.push({ name: 'Stagiaires' })
          })
          .catch(() => {})
        NProgress.done()
      }
    },
    viewStage(item) {
      this.$router.push({
        name: 'Stage-Modifier',
        params: { id: item.stageId }
      })
    },
    formatDate: function(date) {
      let dateFormat = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
      if (dateFormat == 'Invalid date') {
        return null
      } else {
        return dateFormat
      }
    }
  }
}
</script>