<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Formulaire de suppression d'un type d'entreprise
  -- Fichier : DeleteTypeEntreprise.vue
  -->

<template>
  <v-form
    ref="formDeleteTypeEntreprise"
    v-model="validCreateTypeEntreprise"
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
          <span class="headline">Supprimer un statut d'entreprise</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une suppression est définitive !
          </h3>
          <v-card
            class="mx-auto"
            tile
            v-if="typeEntreprise.entrepris.length > 0"
          >
            <v-list disabled>
              <v-subheader
                >Il faut supprimer le statut lié aux entreprises avant de
                supprimer le statut</v-subheader
              >
              <v-list-item-group
                v-model="typeEntreprise.entrepris"
                color="primary"
              >
                <v-list-item
                  v-for="(entreprise, i) in typeEntreprise.entrepris"
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
            @click="deleteTypeEntreprise()"
            v-if="typeEntreprise.entrepris.length == 0"
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
    typeEntreprise: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateTypeEntreprise: true,
    dialog: false
  }),

  methods: {
    // Supprime un type d'entreprise
    deleteTypeEntreprise() {
      NProgress.start()
      store
        .dispatch(
          'typeEntreprise/deleteTypeEntreprise',
          this.typeEntreprise.typeEntrepriseId
        )
        .then(() => {
          this.$router.push({
            name: 'Type-Entreprises'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
