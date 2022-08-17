const path = require('path')

function getModuleLabel(module) {
    const parts = module.filename.split(path.sep)
    const filename = parts[parts.length - 1]
    const dir = parts[parts.length - 2]
    const fullName = dir + '/' + filename
    return filename === 'index.js' ? dir : fullName
}

module.exports = {getModuleLabel}
