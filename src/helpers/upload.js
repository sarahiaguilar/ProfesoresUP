import path from 'path'
import mapValues from 'lodash/fp/mapValues'
import multiparty from 'multiparty'

export default function upload (req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form({uploadDir: path.join(__dirname, '../../../uploads')})
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({
        ...mapValues(f => f.toString(), fields),
        ...mapValues(f => req.protocol + '://' + req.get('host') + '/uploads/' + f[0].path.split('/').pop(), files)
      })
    })
  })
}
