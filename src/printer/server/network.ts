/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
import { PrintOptions } from 'printer/types'

export const print = (options: PrintOptions): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { host, ...data } = options
    if (host === 'localhost') {
      axios
        .post(`http://${host}:8433/print`, data, {
          validateStatus: (status) => status === 200
        })
        .then((e) => resolve(true))
        .catch(reject)
    } else {
      const winHtml = `<!DOCTYPE html>
          <html>
              <head>
                  <title>Imprimindo...</title>
              </head>
              <body>
              </body>
          </html>
          <script>
            var xhr = new XMLHttpRequest();
            xhr.timeout = 2000
            xhr.addEventListener("load", ()=>{
              window.close()
              window.postMessage("load")
            });
            xhr.addEventListener("error", ()=>{
              window.close()
              window.postMessage("error")
            });
            xhr.ontimeout = function (e) {
              window.close()
              window.postMessage("ontimeout")
            };
            
            xhr.open("POST", "${`http://${host}:8433/print`}");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(${JSON.stringify(data)}));
          </script>
      `
      const winUrl = URL.createObjectURL(new Blob([winHtml], { type: 'text/html' }))
      const popup = window.open(
        winUrl,
        'win',
        'width=800,height=400,screenX=200,screenY=200'
      )
      popup?.addEventListener('message', ({ data: e }) => {
        console.log('message', e)
        if (e === 'error') {
          alert('ocurrió un error')
        }
        if (e === 'ontimeout') {
          alert('no se pudo conectar con el host')
        }
      })
    }
  })
}
