<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'une offre
  -- Fichier : DeleteTypeOffre.vue
  -->

<template>
  <v-form
    ref="formDeleteTypeOffre"
    v-model="validCreateTypeOffre"
    lazy-validation
  >
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          tile
          color="red"
          dark
          min-width="150"
          class="ma-2"
        >
          Supprimer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Supprimer une offre</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une suppression est définitive !
          </h3>
          <v-card
            class="mx-auto"
            tile
            v-if="typeOffre.entrepriseOffres.length > 0"
          >
            <v-list disabled>
              <v-subheader
                >Il faut supprimer le métier lié aux entreprises avant de
                supprimer le métier</v-subheader
              >
              <v-list-item-group
                v-model="typeOffre.entrepriseOffres"
                color="primary"
              >
                <v-list-item
                  v-for="(entrepriseOffre, i) in typeOffre.entrepriseOffres"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="nom"
                      v-text="entrepriseOffre.entreprise.nom"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteTypeOffre()"
            v-if="typeOffre.entrepriseOffres.length == 0"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'

export default {
  props: {
    typeOffre: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateTypeOffre: true,
    dialog: false
  }),

  methods: {
    // Supprime une offre
    deleteTypeOffre() {
      NProgress.start()
      store
        .dispatch('typeOffre/deleteTypeOffre', this.typeOffre.typeOffreId)
        .then(() => {
          this.$router.push({
            name: 'Offres'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
