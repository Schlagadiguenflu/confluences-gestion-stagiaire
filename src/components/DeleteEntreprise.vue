<template>
  <v-form
    ref="formDeleteEntreprise"
    v-model="validCreateEntreprise"
    lazy-validation
  >
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" tile color="red" dark class="ma-2">
          Supprimer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Supprimer une entreprise</span>
        </v-card-title>
        <v-card-text>
          <h3 class="mb-3">
            Attention cela supprimera non seulement l'entreprise mais aussi :
          </h3>
          <v-card class="mx-auto" tile>
            <v-list disabled>
              <v-subheader>Les stages liées à l'entreprise</v-subheader>
              <v-list-item-group v-model="entreprise.stages" color="primary">
                <v-list-item v-for="(stage, i) in entreprise.stages" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="
                        stage.stagiaire.firstname +
                          ' ' +
                          stage.stagiaire.lastName +
                          ' : ' +
                          stage.typeMetier.libelle
                      "
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-card class="mx-auto" tile>
            <v-list disabled>
              <v-subheader>Les contacts liées à l'entreprise</v-subheader>
              <v-list-item-group v-model="entreprise.contacts" color="primary">
                <v-list-item
                  v-for="(contact, i) in entreprise.contacts"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      name="libelle"
                      v-text="contact.prenom + ' ' + contact.nom"
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
          <v-btn color="red darken-1" text @click="deleteEntreprise()">
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
    entreprise: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    validCreateEntreprise: true,
    dialog: false
  }),

  methods: {
    deleteEntreprise() {
      NProgress.start()
      store
        .dispatch('entreprise/deleteEntreprise', this.entreprise.entrepriseId)
        .then(() => {
          this.$router.push({
            name: 'Entreprises'
          })
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>
