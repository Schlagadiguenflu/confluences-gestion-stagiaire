<template>
  <v-row justify="end">
    <v-form
      ref="formCreateContact"
      v-model="validCreateContact"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
            outlined
            fab
            x-small
            class="mx-3"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter un contact</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="contact.prenom"
              :counter="50"
              label="Prénom"
              :rules="requiredRule"
              required
            ></v-text-field>
            <v-text-field
              v-model="contact.nom"
              :counter="50"
              label="Nom"
              :rules="requiredRule"
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
              label="Téléphone fixe"
            ></v-text-field>
            <v-text-field
              v-model="contact.natel"
              :counter="13"
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
import NProgress from 'nprogress'

export default {
  props: {
    typeEntrepriseId: {
      type: Number,
      required: true
    }
  },
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
      nom: null,
      prenom: null,
      telFix: null
    },
    emailRules: [v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide"],
    requiredRule: [v => !!v || 'Obligatoire']
  }),

  created() {
    this.contact.entrepriseId = this.typeEntrepriseId
    this.contact.createurId = this.$store.state.authentification.user.profile.sub
    this.contact.dateCreation = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '/')
    this.contact.modificateurId = this.contact.createurId
    this.contact.dateModification = this.contact.dateCreation
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
