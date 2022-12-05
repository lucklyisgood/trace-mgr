// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

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
