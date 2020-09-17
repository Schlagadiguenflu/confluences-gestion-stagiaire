<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des offres depuis une entreprise
  -- Fichier : EntrepriseOffreList.vue
  -->

<template>
  <v-card class="mx-auto" outlined>
    <v-list>
      <v-subheader>
        Type d'offre
        <v-spacer></v-spacer>
        <CreateOffre :typeEntrepriseId="entreprise.entrepriseId" />
      </v-subheader>
      <v-list-item-group color="primary">
        <transition-group name="slide-fade" appear>
          <v-list-item
            v-for="(item, index) in entreprise.entrepriseOffres"
            :key="index + 0"
            :inactive="true"
          >
            <v-list-item-content>
              <v-list-item-title
                v-html="item.typeOffre.libelle"
              ></v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon
              color="red"
              @click="deleteOffre(item.entrepriseId, item.typeOffreId)"
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
import CreateOffre from '@/components/CreateOffre.vue'

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  components: {
    CreateOffre
  },

  methods: {
    // Supprime une offre
    deleteOffre(entrepriseId, offreId) {
      NProgress.start()
      store
        .dispatch('entrepriseOffre/deleteEntrepriseOffre', {
          entrepriseId,
          offreId
        })
        .then(() => {
          store.dispatch('entreprise/deleteOffre', offreId)
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>

<style></style>
