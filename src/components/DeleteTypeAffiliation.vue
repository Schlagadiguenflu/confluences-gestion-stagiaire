<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'une affiliation
  -- Fichier : DeleteTypeAffiliation.vue
  -->

<template>
  <v-form
    ref="formDeleteTypeAffiliation"
    v-model="validCreateTypeAffiliation"
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
          <span class="headline">Supprimer une affiliation</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une suppression est définitive !
          </h3>
          <v-card
            class="mx-auto"
            tile
            v-if="typeAffiliation.aspNetUsers.length > 0"
          >
            <v-list disabled>
              <v-subheader
                >Il faut supprimer l'affiliation liée aux stagiaires avant de
                pouvoir supprimer l'affiliation</v-subheader
              >
              <v-list-item-group
                v-model="typeAffiliation.aspNetUsers"
                color="primary"
              >
                <v-list-item
                  v-for="(user, i) in typeAffiliation.aspNetUsers"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="nom"
                      v-text="user.firstname + ' ' + user.lastName"
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
            @click="deleteTypeAffiliation()"
            v-if="typeAffiliation.aspNetUsers.length == 0"
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
    typeAffiliation: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateTypeAffiliation: true,
    dialog: false
  }),

  methods: {
    // Supprime une affiliation
    deleteTypeAffiliation() {
      NProgress.start()
      store
        .dispatch(
          'typeAffiliation/deleteTypeAffiliation',
          this.typeAffiliation.typeAffiliationId
        )
        .then(() => {
          this.$router.push({
            name: 'Affiliations'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
