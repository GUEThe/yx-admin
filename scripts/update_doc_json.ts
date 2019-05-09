import http from 'http'
import fs from 'fs'
import { API } from './config'
import { sh } from './helpers'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

function loadDocJson() {
  return new Promise(function(resolve, reject) {
    http
      .get(API.DOC_JSON_URL, function(res: any) {
        const { statusCode } = res
        let error
        if (statusCode !== 200) {
          error = new Error(
            'Request doc.json failed.\n' + `StatusCode: ${statusCode}`
          )
        }
        if (error) {
          console.error(error.message)
          // consume response data to free up memory
          res.resume()
          reject(error)
          return
        }
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk: any) => {
          rawData += chunk
        })
        res.on('end', () => {
          resolve(rawData)
        })
      })
      .on('error', (error: any) => {
        console.error(`Got error: ${error.message}`)
        reject(error)
      })
  })
}

async function updateDocJson() {
  const newContent = await loadDocJson()
  fs.writeFileSync(API.DOC_PATH, newContent)
  sh(`git diff --stat ${API.DOC_PATH}`)
}

updateDocJson()
