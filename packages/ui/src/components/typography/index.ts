import type { App, Plugin } from 'vue'
import Text from './Text.vue'
import Title from './Title.vue'
import Paragraph from './Paragraph.vue'
import Link from './Link.vue'
import './style/index.css'

export { default as TypographyText } from './Text.vue'
export { default as TypographyTitle } from './Title.vue'
export { default as TypographyParagraph } from './Paragraph.vue'
export { default as TypographyLink } from './Link.vue'
export * from './types'

const Typography = {
  install(app: App) {
    app.component('ATypographyText', Text)
    app.component('ATypographyTitle', Title)
    app.component('ATypographyParagraph', Paragraph)
    app.component('ATypographyLink', Link)
    return app
  },
}

export default Typography as typeof Typography & Plugin
