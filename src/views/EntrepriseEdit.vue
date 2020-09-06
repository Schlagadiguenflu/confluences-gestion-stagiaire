<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Entreprise</h1>
      </v-col>
    </v-row>
    <v-form ref="formEntreprise" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="3">
          <label style="color: white !important">blank</label>
          <v-row>
            <v-col>
              <v-autocomplete
                v-model="entreprise.typeEntrepriseId"
                :items="typeEntreprise.typeEntreprises"
                item-value="typeEntrepriseId"
                item-text="nom"
                label="Catégorie"
                clearable
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="9">
          <label for="DernierContact">Dernier contact</label>
          <v-row>
            <v-col>
              <v-menu
                ref="menuContact"
                v-model="menuContact"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="entreprise.DernierContact"
                    label="Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="entreprise.DernierContact"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuContact = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menuContact.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="entreprise.formateurIdDernierContact"
                :items="user.users"
                item-value="id"
                item-text="nom"
                label="Par"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="entreprise.stagiaireIdDernierContact"
                :items="user.users"
                item-value="id"
                item-text="nom"
                label="Pour"
                clearable
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
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
            label="Adresse"
          ></v-text-field>
          <v-text-field
            v-model="entreprise.adr2"
            :counter="50"
            label="Complément d'adresse"
          ></v-text-field>
          <v-text-field
            v-model="entreprise.ville"
            :counter="50"
            label="Ville"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="entreprise.codePostal"
                :counter="4"
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
                    >Cancel</v-btn
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
                label="Téléphone fixe"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="entreprise.telFax"
                :counter="13"
                label="Natel"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="8">
          <v-autocomplete
            v-model="entreprise.typeDomaineId"
            :items="typeDomaine.typeDomaines"
            item-value="typeDomaineId"
            item-text="libelle"
            label="Domaine"
            clearable
          ></v-autocomplete>
          <v-row>
            <v-col>
              <EntrepriseMetierList :entreprise="entreprise" />
            </v-col>
            <v-col>
              <EntrepriseOffreList :entreprise="entreprise" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-model="entreprise.remarque"
            label="Remarque"
            counter
            maxlength="10000"
            full-width
            auto-grow
            single-line
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="mb-4">
        <v-col>
          <div class="text-center">
            <v-btn class="ma-2" tile color="success" dark @click="submit()">
              Sauvegarder
            </v-btn>

            <v-btn
              class="ma-2"
              tile
              color="primary"
              dark
              @click="$router.push('/entreprises')"
              >Annuler</v-btn
            >
            <DeleteEntreprise :entreprise="this.entreprise" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <EntrepriseContactList :entreprise="entreprise" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto" outlined>
            <v-list>
              <v-subheader>Stages</v-subheader>
              <EntrepriseStageList :entreprise="entreprise" />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import EntrepriseOffreList from '@/components/EntrepriseOffreList.vue'
import EntrepriseMetierList from '@/components/EntrepriseMetierList.vue'
import EntrepriseStageList from '@/components/EntrepriseStageList.vue'
import EntrepriseContactList from '@/components/EntrepriseContactList.vue'
import DeleteEntreprise from '@/components/DeleteEntreprise.vue'

function getTypeEntreprises() {
  store.dispatch('typeEntreprise/fetchTypeEntreprises', {}).then(() => {})
}

function getTypeDomaines() {
  store.dispatch('typeDomaine/fetchTypeDomaines', {}).then(() => {})
}

function getUsers() {
  store.dispatch('user/fetchUsers', {}).then(() => {})
}

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  components: {
    EntrepriseOffreList,
    EntrepriseMetierList,
    EntrepriseStageList,
    EntrepriseContactList,
    DeleteEntreprise
  },

  data: () => ({
    date: null,
    menuContact: false,
    menuCreation: false,
    valid: true,
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ],
    emailRules: [v => !v || /.+@.+\..+/.test(v) || "L'email doit être valide"],
    select: null
  }),

  beforeCreate(routeTo, routeFrom, next) {
    getTypeEntreprises(routeTo, next)
    getTypeDomaines(routeTo, next)
    getUsers(routeTo, next)
  },

  computed: {
    ...mapState(['typeEntreprise', 'typeDomaine', 'user'])
  },

  methods: {
    submit() {
      if (this.$refs.formEntreprise.validate()) {
        NProgress.start()
        store
          .dispatch('entreprise/editEntreprise', this.entreprise)
          .then(() => {})
          .catch(() => {})
        NProgress.done()
      }
    }
  }
}
</script>
