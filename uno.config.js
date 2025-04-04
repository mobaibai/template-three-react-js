import { defineConfig, presetUno, presetIcons, presetAttributify, presetTypography, toEscapedSelector } from 'unocss'

export default defineConfig({
  rules: [
    [
      /^rainbow-(\w+)$/,
      ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
        const selector = toEscapedSelector(rawSelector)
        const color = `var(--rb-brand${rawSelector.includes('dark:rainbow') ? '-dark' : ''})`
        if (name === 'text') {
          return `
            ${selector} {
              color: ${color};
            }
          `
        } else if (name === 'bgc') {
          return `
            ${selector} {
              background-color: ${color};
            }
          `
        } else if (name === 'a') {
          return `
            ${selector} a {
              color: ${color};
            }
          `
        }
      }
    ]
  ],
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  shortcuts: [
    {
      center: 'flex justify-center items-center'
    }
  ],
  theme: {
    colors: {
      primary: 'var(--theme-primary)'
    }
  }
})
