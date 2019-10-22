import VSCode from '../components/Exports/VSCode'
import WindowsTerminal from '../components/Exports/WindowsTerminal'

export default {
  components: {
    VSCode,
    WindowsTerminal
  },
  computed: {
    terminals: function () {
      console.log(Object.getPrototypeOf(this.$options.components))
      let terminalObjs = Object.keys(Object.getPrototypeOf(this.$options.components))
      let terminalList = []
      terminalObjs.forEach(terminal => {
        terminalList.push(this.$options.components[terminal].data.name)
      })
      return terminalList
    }
  }
}
