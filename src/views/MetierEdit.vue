<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Métier</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-form
          ref="formCreateTypeMetier"
          v-model="validCreateTypeMetier"
          lazy-validation
        >
          <v-text-field
            v-model="typeMetier.code"
            :counter="10"
            label="Code"
            :rules="codeRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="typeMetier.libelle"
            :counter="60"
            :rules="libelleRules"
            label="Nom"
            required
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>

    <div class="action-container">
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              class="ma-2"
              tile
              color="success"
              dark
              min-width="150"
              @click="submit()"
            >
              Sauvegarder
            </v-btn>
            <DeleteTypeMetier :typeMetier="this.typeMetier" />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import store from '@/store/index.js'
import NProgress from 'nprogress'
import DeleteTypeMetier from '@/components/DeleteTypeMetier.vue'

export default {
  props: {
    typeMetier: {
      type: Object,
      required: true
    }
  },

  components: {
    DeleteTypeMetier
  },

  data: () => ({
    validCreateTypeMetier: true,
    dialog: false,
    codeRules: [
      v => !!v || 'Le champ est obligatoire',
      v => /(\b[A-Z0-9]{1,}\b)/.test(v) || 'En majuscule seulement',
      v => (v && v.length <= 10) || 'Le nom doit être moins que 10 caractères'
    ],
    libelleRules: [
      v => !!v || 'Le champ est obligatoire',
      v => !v || v.length <= 60 || 'Le champ doit être moins que 60 caractères'
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.formCreateTypeMetier.validate()) {
        NProgress.start()
        store
          .dispatch('typeMetier/editTypeMetier', this.typeMetier)
          .then(() => {
            this.$router.push({
              name: 'Metiers'
            })
          })
          .catch(() => {})
        this.dialog = false
        NProgress.done()
      }
    }
  }
}
</script>
