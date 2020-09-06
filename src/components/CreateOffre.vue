<template>
  <v-row justify="end">
    <v-form ref="formCreateOffre" v-model="validCreateOffre" lazy-validation>
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
            <span class="headline">Ajouter une offre</span>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="entrepriseOffre.typeOffreId"
              :items="typeOffre.typeOffres"
              item-value="typeOffreId"
              item-text="libelle"
              :rules="[v => !!v || 'Obligatoire']"
              label="Type d'offre"
              required
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fermer
            </v-btn>
            <v-btn color="blue darken-1" text @click="submit()"
              >Sauvegarder
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

function getTypeOffres() {
  store.dispatch('typeOffre/fetchTypeOffres', {}).then(() => {})
}

export default {
  props: {
    typeEntrepriseId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    validCreateOffre: true,
    dialog: false,
    entrepriseOffre: {
      entrepriseId: 0,
      typeOffreId: 0,
      typeOffre: {
        entrepriseOffres: [],
        libelle: '',
        typOffreId: 0
      }
    }
  }),

  beforeCreate(routeTo, routeFrom, next) {
    getTypeOffres(routeTo, next)
  },

  created() {
    this.entrepriseOffre.entrepriseId = this.typeEntrepriseId
  },

  computed: {
    ...mapState(['typeOffre'])
  },

  methods: {
    submit() {
      if (this.$refs.formCreateOffre.validate()) {
        NProgress.start()
        store
          .dispatch(
            'entrepriseOffre/createEntrepriseOffre',
            this.entrepriseOffre
          )
          .then(() => {
            let entrepriseOffreClone = JSON.parse(
              JSON.stringify(this.entrepriseOffre)
            )
            entrepriseOffreClone.typeOffre.libelle = this.typeOffre.typeOffres.find(
              t => t.typeOffreId == entrepriseOffreClone.typeOffreId
            ).libelle
            this.addNewData(entrepriseOffreClone)
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    },
    addNewData(data) {
      store
        .dispatch('entreprise/addOffre', data)
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
