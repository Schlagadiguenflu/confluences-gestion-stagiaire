<template>
  <v-form
    ref="formDeleteStagiaire"
    v-model="validCreateStagiaire"
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
          <span class="headline">Supprimer un stagiaire</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention une supression est définitive et supprimera non seulement
            le stagiaire mais aussi :
          </h3>
          <v-card class="mx-auto" tile>
            <v-list disabled>
              <v-subheader>Les stages liées à une entreprise</v-subheader>
              <v-list-item-group
                v-model="stagiaire.stageStagiaires"
                color="primary"
              >
                <v-list-item
                  v-for="(stage, i) in stagiaire.stageStagiaires"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="stage.entreprise.nom"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card
            class="mx-auto"
            tile
            v-if="
              stagiaire.entreprisFormateurIdDernierContactNavigations.length > 0
            "
          >
            <v-list disabled>
              <v-subheader class="red--text">
                Le dernier contact liés à une entreprise (par qui) à supprimer
                manuellement
              </v-subheader>
              <v-list-item-group
                v-model="
                  stagiaire.entreprisFormateurIdDernierContactNavigations
                "
                color="primary"
              >
                <v-list-item
                  v-for="(dernierContact,
                  i) in stagiaire.entreprisFormateurIdDernierContactNavigations"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="dernierContact.nom"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card
            class="mx-auto"
            tile
            v-if="
              stagiaire.entreprisStagiaireIdDernierContactNavigations.length > 0
            "
          >
            <v-list disabled>
              <v-subheader class="red--text">
                Le dernier contact liés à une entreprise (pour qui) à supprimer
                manuellement
              </v-subheader>
              <v-list-item-group
                v-model="
                  stagiaire.entreprisStagiaireIdDernierContactNavigations
                "
                color="primary"
              >
                <v-list-item
                  v-for="(dernierContact,
                  i) in stagiaire.entreprisStagiaireIdDernierContactNavigations"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="dernierContact.nom"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card
            class="mx-auto"
            tile
            v-if="stagiaire.stageCreateurs.length > 0"
          >
            <v-list disabled>
              <v-subheader class="red--text">
                Le dernier créateur-trice liés à un stage à supprimer
                manuellement
              </v-subheader>
              <v-list-item-group
                v-model="stagiaire.stageCreateurs"
                color="primary"
              >
                <v-list-item
                  v-for="(stageCreateur, i) in stagiaire.stageCreateurs"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="stageCreateur.nom"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <h3 class="mt-3 red--text">
            Ainsi que tous les liens avec le site de télétravail (exercice fait,
            rendez-vous, etc.)
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fermer
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteStagiaire"
            v-if="deleteOn"
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
    stagiaire: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateStagiaire: true,
    dialog: false
  }),

  computed: {
    deleteOn: function() {
      if (
        this.stagiaire.entreprisStagiaireIdDernierContactNavigations.length ==
          0 &&
        this.stagiaire.entreprisFormateurIdDernierContactNavigations.length ==
          0 &&
        this.stagiaire.stageCreateurs.length == 0
      ) {
        return true
      }
      return false
    }
  },

  methods: {
    deleteStagiaire() {
      NProgress.start()
      store
        .dispatch('stagiaire/deleteStagiaire', this.stagiaire.stagiaireId)
        .then(() => {
          this.$router.push({
            name: 'Stagiaires'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
