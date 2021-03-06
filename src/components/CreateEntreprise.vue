<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de création d'une entreprise depuis la liste des contacts
  -- Fichier : CreateEntreprise.vue
  -->

<template>
  <v-row>
    <v-form
      ref="formCreateEntreprise"
      v-model="validCreateEntreprise"
      lazy-validation
    >
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-3" color="primary">
            Ajouter une entreprise
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Ajouter une entreprise</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="entreprise.nom"
              :counter="50"
              :rules="nameRules"
              label="Nom"
              required
            ></v-text-field>
            <v-text-field
              v-model="entreprise.adr1"
              :counter="50"
              :rules="adressRules"
              label="Adresse"
            ></v-text-field>
            <v-text-field
              v-model="entreprise.adr2"
              :counter="50"
              :rules="adressRules"
              label="Complément d'adresse"
            ></v-text-field>
            <v-text-field
              v-model="entreprise.ville"
              :counter="50"
              :rules="nameRules"
              label="Ville"
              required
            ></v-text-field>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="entreprise.codePostal"
                  :counter="4"
                  :rules="[codePostalRules]"
                  label="Code postal"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-menu
                  ref="menuCreation"
                  v-model="menuCreation"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="entreprise.dateCreation"
                      label="Chez Confluences depuis"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="entreprise.dateCreation"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuCreation = false"
                      >Annuler</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuCreation.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-text-field
              v-model="entreprise.email"
              :counter="50"
              :rules="emailRules"
              label="Email"
            ></v-text-field>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="entreprise.telFix"
                  :counter="13"
                  :rules="phonesRules"
                  label="Téléphone fixe"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="entreprise.telNatel"
                  :counter="13"
                  :rules="phonesRules"
                  label="Natel"
                ></v-text-field>
              </v-col>
            </v-row>
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
  data: () => ({
    validCreateEntreprise: true,
    dialog: false,
    date: null,
    menuContact: false,
    menuCreation: false,
    entreprise: {
      entrepriseId: 0,
      nom: null,
      ville: null,
      telFix: null,
      telNatel: null,
      adr1: null,
      adr2: null,
      codePostal: null,
      email: null,
      remarque: null,
      dateCreation: null,
      typeEntrepriseId: null,
      typeDomaineId: null,
      typeMoyenId: null,
      dateDernierContact: null,
      createurId: null,
      formateurIdDernierContact: null,
      stagiaireIdDernierContact: null,
      createur: null,
      formateurIdDernierContactNavigation: null,
      stagiaireIdDernierContactNavigation: null,
      typeMoyen: null
    },
    nameRules: [
      v => !!v || 'Le champ est obligatoire',
      v =>
        (v && v.length <= 50) || 'Le champs doit être moins que 50 caractères'
    ],
    adressRules: [
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ],
    codePostalRules: v => {
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999) return true
      return 'En Suisse, 4 chiffres'
    },
    emailRules: [
      v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide",
      v => !v || v.length <= 50 || 'Le champ doit être moins que 50 caractères'
    ],
    phonesRules: [
      v => !v || v.length <= 13 || 'Le champ doit être moins que 13 caractères'
    ],
    requiredRule: [v => !!v || 'Obligatoire']
  }),

  methods: {
    // Si le formulaire est valide, création d'une entreprise
    submit() {
      if (this.$refs.formCreateEntreprise.validate()) {
        NProgress.start()
        store
          .dispatch('entreprise/createEntreprise', this.entreprise)
          .then(response => {
            this.$refs.formCreateEntreprise.reset()
            this.$router.push({
              name: 'Entreprise-Modifier',
              params: { id: response.entrepriseId }
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
