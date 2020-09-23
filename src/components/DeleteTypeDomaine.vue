<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'un domaine
  -- Fichier : DeleteDomaine.vue
  -->

<template>
  <v-form ref="formDeleteDomaine" v-model="validCreateDomaine" lazy-validation>
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
          <span class="headline">Supprimer un domaine</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une supression est définitive
          </h3>
          <v-card class="mx-auto" tile v-if="typeDomaine.entrepris.length > 0">
            <v-list disabled>
              <v-subheader
                >Il faut supprimer le domaine lié aux entreprises avant de
                supprimer le domaine</v-subheader
              >
              <v-list-item-group
                v-model="typeDomaine.entrepris"
                color="primary"
              >
                <v-list-item
                  v-for="(entreprise, i) in typeDomaine.entrepris"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="nom"
                      v-text="entreprise.nom"
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
            @click="deleteTypeDomaine()"
            v-if="typeDomaine.entrepris.length == 0"
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
    typeDomaine: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateDomaine: true,
    dialog: false
  }),

  methods: {
    // Supprime un domaine
    deleteTypeDomaine() {
      NProgress.start()
      store
        .dispatch(
          'typeDomaine/deleteTypeDomaine',
          this.typeDomaine.typeDomaineId
        )
        .then(() => {
          this.$router.push({
            name: 'Domaines'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
