import button from '../components/button/src/button'

const install = function (app, opts = {}) {
  app.component(button.name, button)
}

export default {
  install
}
