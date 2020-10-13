<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Liste des métiers depuis une entreprise
  -- Fichier : EntrepriseDomaineList.vue
  -->

<template>
  <v-card class="mx-auto" outlined>
    <v-list>
      <v-subheader>
        Domaines
        <v-spacer></v-spacer>
        <CreateDomaine :typeEntrepriseId="entreprise.entrepriseId" />
      </v-subheader>
      <v-list-item-group color="primary">
        <transition-group name="slide-fade" appear>
          <v-list-item
            v-for="(item, index) in entreprise.entrepriseDomaines"
            :key="index + 0"
            :inactive="true"
          >
            <v-list-item-content>
              <v-list-item-title
                v-html="item.typeDomaine.libelle"
              ></v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon
              color="red"
              @click="deleteDomaine(item.entrepriseId, item.typeDomaineId)"
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
import CreateDomaine from '@/components/CreateDomaine.vue'

export default {
  props: {
    entreprise: {
      type: Object,
      required: true
    }
  },

  components: {
    CreateDomaine
  },

  methods: {
    // Supprime un domaine
    deleteDomaine(entrepriseId, domaineId) {
      NProgress.start()
      store
        .dispatch('entrepriseDomaine/deleteEntrepriseDomaine', {
          entrepriseId,
          domaineId
        })
        .then(() => {
          store.dispatch('entreprise/deleteDomaine', domaineId)
        })
        .catch(() => {})
      this.dialog = false
      NProgress.done()
    }
  }
}
</script>

<style></style>
