// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  {
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        fa,
        mdi
      }
    },
    theme: {
      defaultTheme: 'light' // dark light
    }
  }
)
