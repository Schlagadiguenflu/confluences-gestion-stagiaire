<template>
  <v-form
    ref="formFilterEntreprise"
    v-model="validFilterEntreprise"
    lazy-validation
  >
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary" dark>
          Filtrer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Filtrer les entreprises</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Tous les filtres sont optionnelles :
          </h3>
          <v-card class="mx-auto" tile>
            <v-list>
              <v-subheader>
                Métier
                <v-spacer></v-spacer>
                <FilterEntrepriseAddMetier />
              </v-subheader>
              <v-list-item-group color="primary">
                <transition-group name="slide-fade" appear>
                  <v-list-item
                    v-for="(metier, i) in entreprise.filter.metiers"
                    :key="i + 0"
                    :inactive="true"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        name="libelle"
                        v-text="metier.libelle"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-icon
                      color="red"
                      @click="deleteMetier(metier.typeMetierId)"
                    >
                      mdi-delete
                    </v-icon>
                  </v-list-item>
                </transition-group>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card class="mx-auto" tile>
            <v-list>
              <v-subheader>
                Domaine
                <FilterEntrepriseAddDomaine />
              </v-subheader>
              <v-list-item-group color="primary">
                <transition-group name="slide-fade" appear>
                  <v-list-item
                    v-for="(domaine, i) in entreprise.filter.domaines"
                    :key="i + 0"
                    :inactive="true"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        name="libelle"
                        v-text="domaine.libelle"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-icon
                      color="red"
                      @click="deleteDomaine(domaine.typeDomaineId)"
                    >
                      mdi-delete
                    </v-icon>
                  </v-list-item>
                </transition-group>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card class="mx-auto" tile>
            <v-list>
              <v-subheader>
                Offre
                <v-spacer></v-spacer>
                <FilterEntrepriseAddOffre />
              </v-subheader>
              <v-list-item-group color="primary">
                <transition-group name="slide-fade" appear>
                  <v-list-item
                    v-for="(offre, i) in entreprise.filter.offres"
                    :key="i + 0"
                    :inactive="true"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        name="libelle"
                        v-text="offre.libelle"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-icon color="red" @click="deleteOffre(offre.typeOffreId)">
                      mdi-delete
                    </v-icon>
                  </v-list-item>
                </transition-group>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card class="mx-auto" tile>
            <v-row>
              <v-col class="mx-4">
                <v-text-field
                  v-model="entreprise.filter.codePostal"
                  :counter="4"
                  label="Code postal"
                ></v-text-field>
                <v-text-field
                  v-model="entreprise.filter.nom"
                  :counter="50"
                  label="Nom"
                ></v-text-field>
                <v-menu
                  ref="menuModification"
                  v-model="menuModification"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="entreprise.filter.dateModification"
                      label="Date de modification"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="entreprise.filter.dateModification"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menuModification = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuModification.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <v-autocomplete
                  v-model="entreprise.filter.createur"
                  :items="user.users"
                  item-value="id"
                  item-text="nom"
                  label="Createur"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
          <v-btn color="blue darken-1" text @click="deletefilterEntreprise()">
            Effacer le filtre
          </v-btn>
          <v-btn color="blue darken-1" text @click="filterEntreprise()">
            Filtrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import FilterEntrepriseAddMetier from '@/components/FilterEntrepriseAddMetier.vue'
import FilterEntrepriseAddOffre from '@/components/FilterEntrepriseAddOffre.vue'
import FilterEntrepriseAddDomaine from '@/components/FilterEntrepriseAddDomaine.vue'

function getUsers() {
  store.dispatch('user/fetchUsers', {}).then(() => {})
}

export default {
  components: {
    FilterEntrepriseAddMetier,
    FilterEntrepriseAddOffre,
    FilterEntrepriseAddDomaine
  },

  data: () => ({
    date: null,
    menuModification: false,
    validFilterEntreprise: true,
    dialog: false,
    nameRules: [
      v => !!v || 'Le nom est obligatoire',
      v => (v && v.length <= 50) || 'Le nom doit être moins que 50 caractères'
    ]
  }),

  beforeCreate(routeTo, routeFrom, next) {
    getUsers(routeTo, next)
  },

  computed: {
    ...mapState(['entreprise', 'user'])
  },

  methods: {
    filterEntreprise() {
      NProgress.start()
      store
        .dispatch('entreprise/saveFilterEntreprise', this.entreprise.filter)
        .then(() => {})
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    },
    deletefilterEntreprise() {
      NProgress.start()
      store
        .dispatch('entreprise/deleteFilterEntreprise')
        .then(() => {})
        .catch(() => {})
      store
        .dispatch('entreprise/fetchEntreprises')
        .then(() => {})
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    },
    deleteMetier(typeMetierId) {
      NProgress.start()
      store
        .dispatch('entreprise/deleteFilterMetier', typeMetierId)
        .then(() => {})
        .catch(() => {})
      NProgress.done()
    },
    deleteDomaine(typeDomaineId) {
      store
        .dispatch('entreprise/deleteFilterDomaine', typeDomaineId)
        .then(() => {})
        .catch(() => {})
    },
    deleteOffre(typeOffreId) {
      store
        .dispatch('entreprise/deleteFilterOffre', typeOffreId)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
