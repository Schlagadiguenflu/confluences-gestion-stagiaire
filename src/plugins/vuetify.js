import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import fr from 'vuetify/src/locale/fr.ts'

Vue.use(Vuetify)

Vue.component('my-component', {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = 'fr'
    }
  }
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0078be',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: '#73523d'
      }
    }
  },
  lang: {
    locales: { fr },
    current: 'fr'
  }
})
