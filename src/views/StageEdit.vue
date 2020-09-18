<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de modification d'un stage
  -- Fichier : StageEdit.vue
  -->

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Stage</h1>
      </v-col>
    </v-row>
    <v-form ref="formStage" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="stage.nom"
            :counter="50"
            :rules="nameRules"
            label="Nom"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-autocomplete
            v-model="stage.typeStageId"
            :items="typeStage.typeStages"
            item-value="typeStageId"
            item-text="nom"
            label="Type de stage"
            :rules="requiredRule"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            v-model="stage.createurId"
            :items="user.users"
            item-value="id"
            item-text="nom"
            label="Créateur-trice"
            :rules="requiredRule"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3">
          <v-autocomplete
            v-model="stage.typeAnnonceId"
            :items="typeAnnonce.typeAnnonces"
            item-value="typeAnnonceId"
            item-text="libelle"
            label="Stage à annoncer"
            clearable
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="stage.typeMetierId"
            :items="typeMetier.typeMetiers"
            item-value="typeMetierId"
            item-text="libelle"
            label="Métier"
            :rules="requiredRule"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="stage.entrepriseId"
            :items="entreprise.entreprises"
            item-value="entrepriseId"
            item-text="nom"
            label="Entreprise"
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="stage.stagiaireId"
            :items="user.users"
            item-value="id"
            item-text="nom"
            label="Stagiaire"
            :rules="requiredRule"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12" md="6">
              <v-menu
                ref="menuDebut"
                v-model="menuDebut"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="stage.debut"
                    label="Début"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="requiredRule"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="stage.debut" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDebut = false"
                    >Annuler</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menuDebut.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                ref="menuFin"
                v-model="menuFin"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="stage.fin"
                    label="Fin"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker v-model="stage.fin" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuFin = false"
                    >Annuler</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menuFin.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6">
              <v-checkbox v-model="stage.repas" label="Repas"></v-checkbox>
            </v-col>
            <v-col cols="6" md="6">
              <v-checkbox v-model="stage.trajets" label="Trajets"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="stage.horaireMatin"
                :counter="11"
                :rules="horaireRules"
                label="Horaire matin"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="stage.horaireApresMidi"
                :counter="11"
                :rules="horaireRules"
                label="Horaire après-midi"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox
            v-model="stage.attestation"
            label="Attestation"
          ></v-checkbox>
          <v-checkbox v-model="stage.rapport" label="Rapport"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="stage.remarque"
            outlined
            label="Remarques"
            counter
            maxlength="500"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="stage.bilan"
            outlined
            label="Bilan du stage"
            counter
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-model="stage.actionSuivi"
            outlined
            label="Suivi"
            counter
            maxlength="500"
            auto-grow
          ></v-textarea>
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
              <DeleteStage :stage="this.stage" />
              <v-btn
                class="ma-2"
                tile
                color="primary"
                dark
                min-width="150"
                @click="$router.go(-1)"
              >
                Annuler
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
import DeleteStage from '@/components/DeleteStage.vue'
import moment from 'moment'

function getTypeStages() {
  store.dispatch('typeStage/fetchTypeStages', {}).then(() => {})
}

function getTypeAnnonces() {
  store.dispatch('typeAnnonce/fetchTypeAnnonces', {}).then(() => {})
}

function getTypeMetier() {
  store.dispatch('typeMetier/fetchTypeMetiers', {}).then(() => {})
}

function getTypeEntreprises() {
  store.dispatch('entreprise/fetchEntreprises', {}).then(() => {})
}

function getUsers() {
  store.dispatch('user/fetchUsers', {}).then(() => {})
}

export default {
  props: {
    stage: {
      type: Object,
      required: true
    }
  },

  components: {
    DeleteStage
  },

  data: () => ({
    date: null,
    menuDebut: false,
    menuFin: false,
    valid: true,
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ],
    horaireRules: [
      v =>
        (v && v.length <= 11) ||
        !v ||
        "L'horaire doit être moins que 11 caractères"
    ],
    requiredRule: [v => !!v || 'Obligatoire'],
    select: null
  }),

  // Charger les différents possibilités de choix avant la création du composant
  beforeCreate(routeTo, routeFrom, next) {
    getTypeEntreprises(routeTo, next)
    getTypeStages(routeTo, next)
    getTypeAnnonces(routeTo, next)
    getTypeMetier(routeTo, next)
    getUsers(routeTo, next)
  },

  created() {
    // Formattage des dates afin qu'elles s'affichent correctement
    this.stage.debut = this.formatDate(this.stage.debut)
    this.stage.fin = this.formatDate(this.stage.fin)
  },

  computed: {
    ...mapState([
      'entreprise',
      'typeStage',
      'typeAnnonce',
      'typeMetier',
      'user'
    ])
  },

  methods: {
    // Si le formulaire est valide, sauvegarde du stage
    submit() {
      if (this.$refs.formStage.validate()) {
        NProgress.start()
        store
          .dispatch('stage/editStage', this.stage)
          .then(() => {
            this.$router.push({ name: 'Stages' })
          })
          .catch(() => {})
        NProgress.done()
      }
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
