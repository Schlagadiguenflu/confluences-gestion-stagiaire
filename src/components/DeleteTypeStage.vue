<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'un type de stage
  -- Fichier : DeleteTypeStage.vue
  -->

<template>
  <v-form
    ref="formDeleteTypeStage"
    v-model="validCreateTypeStage"
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
          <span class="headline">Supprimer un taux d'occupation</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une suppression est définitive !
          </h3>
          <v-card class="mx-auto" tile v-if="typeStage.stages.length > 0">
            <v-list disabled>
              <v-subheader>
                Il faut supprimer le taux d'occupation lié aux stages
              </v-subheader>
              <v-list-item-group v-model="typeStage.stages" color="primary">
                <v-list-item v-for="(stage, i) in typeStage.stages" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      name="nom"
                      v-text="
                        stage.nom +
                          ' : ' +
                          stage.stagiaire.firstname +
                          ' ' +
                          stage.stagiaire.lastName
                      "
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
            @click="deleteTypeStage()"
            v-if="typeStage.stages.length == 0"
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
    typeStage: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateTypeStage: true,
    dialog: false
  }),

  methods: {
    // Supprime un type de stage
    deleteTypeStage() {
      NProgress.start()
      store
        .dispatch('typeStage/deleteTypeStage', this.typeStage.typeStageId)
        .then(() => {
          this.$router.push({
            name: 'Type-Stages'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
