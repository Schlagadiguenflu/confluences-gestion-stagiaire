<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des métiers depuis une entreprise
  -- Fichier : EntrepriseMetierList.vue
  -->

<template>
  <v-card class="mx-auto" outlined>
    <v-list>
      <v-subheader>
        Métiers
        <v-spacer></v-spacer>
        <CreateMetier :typeEntrepriseId="entreprise.entrepriseId" />
      </v-subheader>
      <v-list-item-group color="primary">
        <transition-group name="slide-fade" appear>
          <v-list-item
            v-for="(item, index) in entreprise.entrepriseMetiers"
            :key="index + 0"
            :inactive="true"
          >
            <v-list-item-content>
              <v-list-item-title
                v-html="item.typeMetier.libelle"
              ></v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon
              color="red"
              @click="deleteMetier(item.entrepriseId, item.typeMetierId)"
            >
              mdi-delete
            </v-icon>
          </v-list-item>
        </transition-group>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'
import CreateMetier from '@/components/CreateMetier.vue'

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  components: {
    CreateMetier
  },

  methods: {
    // Supprime un métier
    deleteMetier(entrepriseId, metierId) {
      NProgress.start()
      store
        .dispatch('entrepriseMetier/deleteEntrepriseMetier', {
          entrepriseId,
          metierId
        })
        .then(() => {
          store.dispatch('entreprise/deleteMetier', metierId)
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>

<style></style>
