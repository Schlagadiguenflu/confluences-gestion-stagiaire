<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'un contact depuis la listes des contacts
  -- Fichier : CreateContactFromList.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateContact"
      v-model="validCreateContact"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter un contact
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un contact</span>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="contact.entrepriseId"
              :items="entreprise.entreprises"
              item-value="entrepriseId"
              item-text="nom"
              label="Entreprise"
              :rules="requiredRule"
              required
            ></v-autocomplete>
            <v-text-field
              v-model="contact.prenom"
              :counter="50"
              label="Prénom"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.nom"
              :counter="50"
              :rules="nameRules"
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.fonction"
              :counter="50"
              :rules="nameRules"
              label="Fonction"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.email"
              :counter="50"
              :rules="emailRules"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="contact.telFix"
              :counter="13"
              :rules="phonesRules"
              label="Téléphone fixe"
            ></v-text-field>
            <v-text-field
              v-model="contact.natel"
              :counter="13"
              :rules="phonesRules"
              label="Natel"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fermer
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

function getEntreprises() {
  store.dispatch('entreprise/fetchEntreprises', {}).then(() => {})
}

export default {
  data: () => ({
    validCreateContact: true,
    dialog: false,
    contact: {
      contactId: 0,
      createurId: null,
      dateCreation: null,
      dateModification: null,
      email: null,
      entrepriseId: null,
      fax: null,
      modificateurId: null,
      natel: null,
      fonction: null,
      nom: null,
      prenom: null,
      telFix: null
    },
    nameRules: [
      v => !!v || 'Le champ est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ],
    emailRules: [
      v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide",
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ],
    phonesRules: [
      v => !v || v.length <= 13 || 'Le champ doit être moins que 13 caractères'
    ],
    requiredRule: [v => !!v || 'Le champ est obligatoire']
  }),

  beforeCreate(routeTo, routeFrom, next) {
    getEntreprises(routeTo, next)
  },

  computed: {
    ...mapState(['entreprise'])
  },

  methods: {
    submit() {
      if (this.$refs.formCreateContact.validate()) {
        NProgress.start()
        store
          .dispatch('contact/createContact', this.contact)
          .then(() => {
            let contactClone = JSON.parse(
              JSON.stringify(store.state.contact.contact)
            )
            this.addNewData(contactClone)
            this.$refs.formCreateContact.reset()
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    addNewData(data) {
      store
        .dispatch('entreprise/addContact', data)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
