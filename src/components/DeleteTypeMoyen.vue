<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'un moyen
  -- Fichier : DeleteMoyen.vue
  -->

<template>
  <v-form ref="formDeleteMoyen" v-model="validCreateMoyen" lazy-validation>
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
          <span class="headline">Supprimer un moyen</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une supression est définitive
          </h3>
          <v-card class="mx-auto" tile v-if="typeMoyen.entrepris.length > 0">
            <v-list disabled>
              <v-subheader>
                Il faut supprimer le moyen lié aux entreprises
              </v-subheader>
              <v-list-item-group v-model="typeMoyen.entrepris" color="primary">
                <v-list-item
                  v-for="(entrepris, i) in typeMoyen.entrepris"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="nom"
                      v-text="entrepris.nom"
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
            @click="deleteTypeMoyen()"
            v-if="typeMoyen.entrepris.length == 0"
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
    typeMoyen: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateMoyen: true,
    dialog: false
  }),

  methods: {
    // Supprime un moyen
    deleteTypeMoyen() {
      NProgress.start()
      store
        .dispatch('typeMoyen/deleteTypeMoyen', this.typeMoyen.typeMoyenId)
        .then(() => {
          this.$router.push({
            name: 'Moyens'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
