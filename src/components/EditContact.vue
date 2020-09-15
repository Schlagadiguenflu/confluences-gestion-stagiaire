<template>
  <v-row justify="center">
    <v-form ref="formEditContact" v-model="validEditContact" lazy-validation>
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="success" dark v-bind="attrs" v-on="on" text fab>
            <v-icon color="blue">
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Modifier un contact</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="contact.prenom"
              :counter="50"
              :rules="nameRules"
              label="Prénom"
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
import NProgress from 'nprogress'

export default {
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    validEditContact: true,
    dialog: false,
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ],
    emailRules: [
      v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide",
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ],
    phonesRules: [
      v => !v || v.length <= 13 || 'Le champ doit être moins que 13 caractères'
    ],
    requiredRule: [v => !!v || 'Obligatoire']
  }),

  created() {
    this.contact.modificateurId = this.$store.state.authentification.user.profile.sub
    this.contact.dateModification = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '/')
  },

  methods: {
    submit() {
      if (this.$refs.formEditContact.validate()) {
        NProgress.start()
        store
          .dispatch('contact/editContact', this.contact)
          .then(() => {
            let contactClone = JSON.parse(JSON.stringify(this.contact))
            this.editData(contactClone)
            this.$refs.formCreateContact.reset()
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    editData(data) {
      store
        .dispatch('entreprise/editContact', data)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
