import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const theme = {
    dark: false,
    colors: {
      background: '#fefefe',
      surface: '#181818',
      primary: '#3b3b3b',
      'primary-darken-1': '#3700B3',
      secondary: '#9d9d9d',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#f0f0f0',
      success: '#4CAF50',
      warning: '#FB8C00',
    }
  }

  export default createVuetify({
    theme: {
      defaultTheme: 'theme',
      themes: {
        theme,
      }
    }
  })