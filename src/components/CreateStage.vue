<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un stage
  -- Fichier : CreateStage.vue
  -->

<template>
  <v-row>
    <v-form ref="formCreateStage" v-model="validCreateStage" lazy-validation>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un stage
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un stage</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="stage.nom"
              :counter="30"
              :rules="nameRules"
              label="Nom"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="stage.typeStageId"
              :items="typeStage.typeStages"
              item-value="typeStageId"
              item-text="nom"
              label="Taux d'occupation"
              :rules="requiredRule"
            ></v-autocomplete>
            <v-autocomplete
              v-model="stage.createurId"
              :items="user.users"
              item-value="id"
              item-text="nom"
              label="Créateur-trice"
              :rules="requiredRule"
            ></v-autocomplete>
            <v-autocomplete
              v-model="stage.typeAnnonceId"
              :items="typeAnnonce.typeAnnonces"
              item-value="typeAnnonceId"
              item-text="libelle"
              label="Stage à annoncer"
              clearable
            ></v-autocomplete>
            <v-autocomplete
              v-model="stage.typeMetierId"
              :items="typeMetier.typeMetiers"
              item-value="typeMetierId"
              item-text="libelle"
              label="Métier"
              :rules="requiredRule"
            ></v-autocomplete>
            <v-autocomplete
              v-model="stage.entrepriseId"
              :items="entreprise.entreprises"
              item-value="entrepriseId"
              item-text="nom"
              label="Entreprise"
              clearable
            ></v-autocomplete>
            <v-autocomplete
              v-model="stage.stagiaireId"
              :items="user.users"
              item-value="id"
              item-text="nom"
              label="Stagiaire"
              :rules="requiredRule"
            ></v-autocomplete>
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
                <v-btn text color="primary" @click="$refs.menuDebut.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
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
                  :rules="dateFinRules"
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit()">
              Sauvegarder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-row>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'

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
  data: () => ({
    validCreateStage: true,
    dialog: false,
    date: null,
    menuDebut: false,
    menuFin: false,
    stage: {
      actionSuivi: null,
      attestation: false,
      bilan: null,
      createurId: null,
      debut: null,
      entrepriseId: null,
      fin: null,
      horaireApresMidi: null,
      horaireMatin: null,
      nom: null,
      rapport: false,
      remarque: null,
      repas: false,
      stageId: 0,
      stagiaireId: null,
      trajets: null,
      typeAnnonceId: null,
      typeMetierId: null,
      typeStageId: null
    },
    nameRules: [
      v => !!v || 'Le champ est obligatoire',
      v => (v && v.length <= 30) || 'Le champ doit être moins que 30 caractères'
    ],
    emailRules: [v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide"],
    requiredRule: [v => !!v || 'Le champ est obligatoire']
  }),

  // Charger les différents possibilités de choix avant la création du composant
  beforeCreate(routeTo, routeFrom, next) {
    getTypeEntreprises(routeTo, next)
    getTypeStages(routeTo, next)
    getTypeAnnonces(routeTo, next)
    getTypeMetier(routeTo, next)
    getUsers(routeTo, next)
  },

  computed: {
    ...mapState([
      'entreprise',
      'typeStage',
      'typeAnnonce',
      'typeMetier',
      'user'
    ]),
    dateFinRules() {
      return [
        () =>
          !this.stage.fin ||
          this.stage.debut <= this.stage.fin ||
          'La date de début doit être plus petite ou égale à la date de fin'
      ]
    }
  },

  methods: {
    // Si le formulaire est valide, création d'un stage
    submit() {
      if (this.$refs.formCreateStage.validate()) {
        NProgress.start()
        store
          .dispatch('stage/createStage', this.stage)
          .then(response => {
            this.$refs.formCreateStage.reset()
            this.$router.push({
              name: 'Stage-Modifier',
              params: { id: response.stageId }
            })
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    }
  }
}
</script>
