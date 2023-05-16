// archivo de sobreescritura
// 2 misiones: aliasWebpack tomará los alias path y lo harán reconocible dentro de tu entorno
const { aliasWebpack, aliasJest } = require('react-app-alias')

// identificación de directorios raíz
const aliasMap = {
  "@molecules": "src/molecules",
  "@services": "src/services",
  "@hooks": "src/hooks",
  "@atoms": "src/atoms",
  "@assets": "src/assets",
  "@colors": "src/colors",
  "@mocks": "src/mocks",
  "@redux": "src/redux-toolkit",
  "@root": "src"
}

const options = {
  alias: aliasMap
}

// primera verificación de las referencias de los directorios
module.exports = aliasWebpack(options)
module.exports = aliasJest(options)

