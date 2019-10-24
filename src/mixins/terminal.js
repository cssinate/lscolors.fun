import VSCode from '../components/Exports/VSCode'
import WindowsTerminal from '../components/Exports/WindowsTerminal'

export default {
  components: {
    VSCode,
    WindowsTerminal
  },
  computed: {
    navItems () {
      let components = Object.keys(Object.getPrototypeOf(this.$options.components))
      let output = []
      components.forEach(comp => {
        output.push({ short: this.$options.components[comp].name, name: this.$options.components[comp].friendlyName })
      })
      this.activeNav = output[0].short
      return output
    }
  },
  data () {
    return {
    }
  }
}
